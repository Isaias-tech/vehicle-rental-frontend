import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const getJWToken = () => {
  return Cookies.get('accessToken');
};

export const refreshJWTToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available.');

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/accounts/login/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const newAccessToken = response.data.access;
    Cookies.set('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
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

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshJWTToken();

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed: ', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
