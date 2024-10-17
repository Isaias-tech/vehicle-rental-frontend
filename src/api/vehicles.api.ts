import { Vehicle, VehicleBrand, VehicleModel, VehicleSearchParams } from '../types/Vehicle.interface';
import axiosInstance from './axiosInterface';

export const getVehicleList = async (params?: VehicleSearchParams): Promise<Vehicle[]> => {
  try {
    const response = await axiosInstance.get<Vehicle[]>('/vehicles/', {
      params, 
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the vehicles.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch the vehicles.');
  }
};

export const createVehicle = async (vehicle: any): Promise<Vehicle> => {
  try {
    const response = await axiosInstance.post<Vehicle>('/vehicles/create/', vehicle);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while creating the vehicle.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to create the vehicle.');
  }
}

export const updateVehicle = async (selectedVehicle: number, vehicle: any): Promise<Vehicle> => {
  try {
    const response = await axiosInstance.put<Vehicle>(`/vehicles/update/${selectedVehicle}/`, vehicle);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while updating the vehicle.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to update the vehicle.');
  }
}

export const deleteVehicle = async (vehicleId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/vehicles/delete/${vehicleId}/`);
  } catch (error: any) {
    console.error(
      'Error while deleting the vehicle.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to delete the vehicle.');
  }
}

export const getVehicleBrands = async (): Promise<VehicleBrand[]> => {
  try {
    const response = await axiosInstance.get<VehicleBrand[]>('/vehicles/brands/');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the vehicle brands.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch the vehicle brands.');
  }
}

export const getVehicleModels = async (brandId: number): Promise<VehicleModel[]> => {
  try {
    const response = await axiosInstance.get<VehicleModel[]>(`/vehicles/brands/${brandId}/models/`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error while fetching the vehicle models.',
      error?.response?.data || error?.message
    );
    throw error.response?.data || new Error('Failed to fetch the vehicle models.');
  }
}


