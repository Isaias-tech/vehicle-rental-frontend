import {
  AuthResponse,
  LoginData,
  PasswordChangeData,
  RegisterData,
  UserAccount,
} from '../types/User.interface';
import axiosInstance from './axiosInterface';
import Cookies from 'js-cookie';

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      '/accounts/login/',
      data
    );
    const { access, refresh } = response.data;

    Cookies.set('accessToken', access, { secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 1,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Error during login',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to login.');
  }
};

export const refreshToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      '/accounts/login/refresh/',
      { refresh: refreshToken }
    );

    const { access, refresh } = response.data;

    Cookies.set('accessToken', access, { secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 1,
    });

    return response.data.access;
  } catch (error: any) {
    console.error(
      'Error while refreshing token.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to refresh token.');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/logout/');
  } catch (error: any) {
    console.error(
      'Error during logout.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to logout.');
  }
};

export const registerUser = async (data: RegisterData): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/register/', data);
  } catch (error: any) {
    console.error(
      'Error during registration.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to register user.');
  }
};

export const verifyEmail = async (token: string): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/verify_email/', { token });
  } catch (error: any) {
    console.error(
      'Error during email verification.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to verify email.');
  }
};

export const updateUser = async (
  data: Partial<UserAccount>
): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.patch<UserAccount>(
      '/accounts/update/',
      data
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during user update.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to update user.');
  }
};

export const getUserProfile = async (): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.get<UserAccount>('/accounts/profile/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching user profile.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch user profile.');
  }
};

export const getUsersList = async (): Promise<UserAccount[]> => {
  try {
    const response = await axiosInstance.get<UserAccount[]>('/accounts/users/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching users list.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch users.');
  }
};

export const resetPassword = async (
  data: PasswordChangeData
): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/reset-password/', data);
  } catch (error: any) {
    console.error(
      'Error during password reset.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to reset password.');
  }
};

export const requestAccountDeletion = async (): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/delete/request/');
  } catch (error: any) {
    console.error(
      'Error during account deletion request.',
      error?.response?.data || error?.message
    );
    throw (
      error.response?.data || new Error('Failed to request account deletion.')
    );
  }
};

export const confirmAccountDeletion = async (token: string): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/delete/confirm/', { token });
  } catch (error: any) {
    console.error(
      'Error during account deletion confirmation.',
      error?.response?.data || error?.message
    );
    throw (
      error.response?.data || new Error('Failed to confirm account deletion.')
    );
  }
};
