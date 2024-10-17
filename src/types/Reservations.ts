import { Vehicle, VehicleDetails } from './Vehicle';

export interface Reservation {
  id: number;
  user: number; // Assuming user is represented by user ID
  vehicle: Vehicle;
  start_date: string; // ISO 8601 Date string (e.g., "2024-10-22T00:00:00Z")
  end_date: string; // ISO 8601 Date string
  is_active: boolean;
  is_canceled: boolean;
  created_at: string; // ISO 8601 Date string
  updated_at: string; // ISO 8601 Date string
}

export interface Transaction {
  id: number;
  reservation: Reservation; // Reference to the Reservation interface
  braintree_transaction_id: string;
  amount: string; // Using string to represent decimal values safely
  status: string;
  created_at: string; // ISO 8601 Date string
}

export interface MostRequestedCar {
  vehicle_name: string;
  request_count: number;
  vehicle_details: VehicleDetails | string; // In case details are not available, it returns a string
}

export interface Report {
  most_requested_cars: MostRequestedCar[];
  total_income: string; // Using string to represent decimal values
}

export interface ReservationFilterParams {
  start_date?: string; // ISO 8601 Date string
  end_date?: string; // ISO 8601 Date string
  status?: 'active' | 'canceled'; // Status filter for reservations
}

export interface TransactionFilterParams {
  start_date?: string; // ISO 8601 Date string
  end_date?: string; // ISO 8601 Date string
}

export interface ReportFilterParams {
  start_date?: string; // ISO 8601 Date string
  end_date?: string; // ISO 8601 Date string
}

export interface ReservationListResponse {
  reservations: Reservation[];
}

export interface TransactionListResponse {
  transactions: Transaction[];
}

export interface ReportResponse {
  most_requested_cars: MostRequestedCar[];
  total_income: string;
}
