import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const getJWToken = () => {
  return Cookies.get('access');
};

export const refreshJWTToken = async () => {
  try {
    const refreshToken = Cookies.get('refresh');
    if (!refreshToken) throw new Error('No refresh token available.');

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/accounts/login/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const newAccessToken = response.data.access;
    Cookies.set('access', newAccessToken);
    return newAccessToken;
  } catch (error) {
    Cookies.remove('access');
    Cookies.remove('refresh');
    throw new Error('Unable to refresh token');
  }
};

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_ENDPOINT}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getJWToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshJWTToken();
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        console.error('Refresh token failed: ', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
