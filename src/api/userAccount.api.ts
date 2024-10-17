import { UserAccount, UserProfile } from '../types/UserAccount';
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
    Cookies.remove('access');
    Cookies.remove('refresh');
  } catch (error: any) {
    console.error(
      'Error while logging out.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to logout.');
  }
};

export const getUser = async (): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.get<UserAccount>('/accounts/user/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error getting user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const updateUser = async (
  user: Partial<UserAccount>
): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.patch<UserAccount>(
      '/accounts/user/update/',
      user
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const getUsers = async (
  page: number = 1
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: UserAccount[];
}> => {
  try {
    const response = await axiosInstance.get(`/accounts/users/?page=${page}`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching users:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const updateUserById = async (
  id: number,
  user: Partial<UserAccount>
): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.patch<UserAccount>(
      `/accounts/users/update/${id}/`,
      user
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating user by ID:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const deleteUser = async (id: number | null = null): Promise<void> => {
  try {
    if (id) {
      // Deleting a user by ID (for admins and managers)
      await axiosInstance.delete(`/accounts/users/delete/${id}/`);
    } else {
      // Deleting the currently logged-in user
      await axiosInstance.delete('/accounts/user/delete/');
    }
  } catch (error: any) {
    console.error(
      'Error deleting user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<UserProfile>(
      `/accounts/user/profile/`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error getting user profile:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const updateUserProfile = async (
  profile: Partial<UserProfile> | FormData
): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.patch<UserProfile>(
      '/accounts/user/profile/update/',
      profile
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating user profile:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};
