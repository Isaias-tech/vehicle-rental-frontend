import { Vehicle, VehicleDetails } from '../types/Vehicle';
import axiosInstance from './axiosInterface';

export const getVehicles = async (
  searchTerm: string = '',
  page: number = 1
): Promise<{
  count: number;
  previous: null | number;
  next: null | number;
  results: Vehicle[];
}> => {
  try {
    const response = await axiosInstance.get(
      `/vehicles/list/?name_contains=${searchTerm}&page=${page}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching vehicles:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const createVehicle = async (
  data: Vehicle | FormData
): Promise<Vehicle> => {
  try {
    const response = await axiosInstance.post('/vehicles/create/', data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const updateVehicle = async (
  id: number,
  data: Partial<Vehicle> | FormData
): Promise<Vehicle> => {
  try {
    const response = await axiosInstance.patch(`/vehicles/update/${id}/`, data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const deleteVehicle = async (vehicle_id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/vehicles/delete/${vehicle_id}/`);
  } catch (error: any) {
    console.error(
      'Error deleting user:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const getVehicleDetail = async (
  vehicle_id: number
): Promise<VehicleDetails> => {
  try {
    const response = await axiosInstance.get(
      `/vehicles/details/${vehicle_id}/`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error getting user detail:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const updateVehicleDetail = async (
  data: VehicleDetails
): Promise<VehicleDetails> => {
  try {
    const response = await axiosInstance.patch(
      `/vehicles/detail/${data.id}/`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating user detail:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};
