export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  is_new: boolean;
  available_from: string;
  available_until: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleSearchParams {
  name_contains?: string;
  from_date?: string;
  to_date?: string;
}

export interface VehicleBrand {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleModel {
  id: number;
  name: string;
  brand: VehicleBrand;
  created_at?: string;
  updated_at?: string;
}
