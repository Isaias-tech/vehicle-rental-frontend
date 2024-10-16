import { AccountDetails, UserAccount } from '../types/User.interface';
import axiosInstance from './axiosInterface';
import Cookies from 'js-cookie';

export const getUsersList = async (): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.get<UserAccount>('/accounts/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the users.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch the users.');
  }
};

export const getUserData = async (): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.get<UserAccount>(`/accounts/user/`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the user data.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch the user data.');
  }
};

export const login = async (
  user: Partial<UserAccount>
): Promise<void> => {
  try {
    user.role = 'Client';
    const response = await axiosInstance.post<any>(
      '/accounts/login/',
      user
    );
    Cookies.set('accessToken', response.data.access, { expires: 1 });
    Cookies.set('refreshToken', response.data.refresh, { expires: 1 });
  } catch (error: any) {
    console.error(
      'Error while logging in.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to login.');
  }
};

export const register = async (user: UserAccount): Promise<UserAccount> => {
  try {
    user.role = 'Client';
    const response = await axiosInstance.post<UserAccount>(
      '/accounts/register/',
      user
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while registering.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to register.');
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

export const updateUser = async (
  user: Partial<UserAccount>
): Promise<UserAccount> => {
  try {
    const response = await axiosInstance.patch<UserAccount>(
      '/accounts/update/',
      user
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while updating the user.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to update the user.');
  }
};

export const requestDeleteUser = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/accounts/delete/');
  } catch (error: any) {
    console.error(
      'Error while deleting the user.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to delete the user.');
  }
};

export const confirmDeleteUser = async (token: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/accounts/delete/confirm/${token}/`);
  } catch (error: any) {
    console.error(
      'Error while confirming the deletion.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to confirm the deletion.');
  }
};

export const getUserProfile = async (): Promise<AccountDetails> => {
  try {
    const response =
      await axiosInstance.get<AccountDetails>('/accounts/profile/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the user profile.',
      error?.response?.data || error?.message
    );
    throw (
      error.response?.data || new Error('Failed to fetch the user profile.')
    );
  }
};

export const updateUserProfile = async (
  profile: Partial<AccountDetails>
): Promise<AccountDetails> => {
  try {
    const response = await axiosInstance.patch<AccountDetails>(
      '/accounts/profile/update/',
      profile
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while updating the user profile.',
      error?.response?.data || error?.message
    );
    throw (
      error.response?.data || new Error('Failed to update the user profile.')
    );
  }
};

export const resetPassword = async (passwords: {
  old_password: string;
  new_password: string;
}): Promise<void> => {
  try {
    await axiosInstance.post('/accounts/reset-password/', passwords);
  } catch (error: any) {
    console.error(
      'Error while resetting the password.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to reset the password.');
  }
};
