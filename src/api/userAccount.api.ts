import { UserAccount } from '../types/UserAccount';
import axiosInstance from './axiosInterface';
import Cookies from 'js-cookie';

export const registerUser = async (user: UserAccount) => {
  try {
    const response = await axiosInstance.post<UserAccount>(
      '/accounts/register/',
      user
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error registering user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const login = async (user: Partial<UserAccount>) => {
  try {
    const response = await axiosInstance.post<{
      access: string;
      refresh: string;
    }>('/accounts/login/', user);
    Cookies.set('access', response.data.access);
    Cookies.set('refresh', response.data.refresh);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error?.response?.data || error?.message);
    throw error?.response?.data || error?.message;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/logout/');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  } catch (error: any) {
    console.error(
      'Error while logging out.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to logout.');
  }
};

