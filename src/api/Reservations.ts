import {
  ReportFilterParams,
  ReportResponse,
  Reservation,
  ReservationFilterParams,
  ReservationListResponse,
  TransactionFilterParams,
  TransactionListResponse,
} from '../types/Reservations';
import axiosInstance from './axiosInterface';

export const getBraintreeClientToken = async () => {
  try {
    const response = await axiosInstance.get(
      '/reservations/braintree/get-client-token/'
    );
    return response.data.token;
  } catch (error) {
    console.error('Error fetching Braintree client token:', error);
    throw error;
  }
};

export const createReservation = async (
  reservation: Partial<Reservation>,
  paymentMethodNonce: string
) => {
  try {
    const response = await axiosInstance.post<Reservation>(
      '/reservations/create/',
      {
        ...reservation,
        payment_method_nonce: paymentMethodNonce,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating reservation:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const cancelReservation = async (reservationId: number) => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      `/reservations/cancel/${reservationId}/`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error canceling reservation:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const listReservations = async (params?: ReservationFilterParams) => {
  try {
    const response = await axiosInstance.get<ReservationListResponse>(
      '/reservations/list/',
      {
        params,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error listing reservations:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const listTransactions = async (params?: TransactionFilterParams) => {
  try {
    const response = await axiosInstance.get<TransactionListResponse>(
      '/reservations/transactions/',
      {
        params,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error listing transactions:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};

export const generateReport = async (params?: ReportFilterParams) => {
  try {
    const response = await axiosInstance.get<ReportResponse>(
      '/reservations/report/',
      {
        params,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error generating report:',
      error?.response?.data || error?.message
    );
    throw error?.response?.data || error?.message;
  }
};
