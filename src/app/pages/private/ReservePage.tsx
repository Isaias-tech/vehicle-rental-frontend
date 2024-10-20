import {
  createReservation,
  getBraintreeClientToken,
} from '../../../api/Reservations';
import { getVehicleDetail } from '../../../api/Vehicle.api';
import { VehicleDetails } from '../../../types/Vehicle';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dropin from 'braintree-web-drop-in';
import DatePicker from 'react-datepicker';

export const ReservePage: React.FC = () => {
  const { vehicle_id } = useParams<{ vehicle_id: string }>();
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [price, setPrice] = useState<number>(0);

  const [braintreeInstance, setBraintreeInstance] = useState<any>(null);
  const [clientToken, setClientToken] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadVehicleDetails = async () => {
    try {
      const data = await getVehicleDetail(parseInt(vehicle_id!));
      setVehicleDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('vehicle_id:', vehicle_id);
    if (vehicle_id) {
      loadVehicleDetails();
    }
  }, [vehicle_id]);

  useEffect(() => {
    const initializeBraintree = async () => {
      try {
        const clientToken = await getBraintreeClientToken();
        setClientToken(clientToken);
      } catch (error) {
        console.error('Failed to get client token:', error);
      }
    };

    initializeBraintree();
  }, [vehicleDetails]);

  useEffect(() => {
    console.log('clientToken:', clientToken);
    if (clientToken) {
      const dropinContainer = document.getElementById('dropin-container');
      if (dropinContainer) {
        dropinContainer.innerHTML = '';
        dropin.create(
          {
            authorization: clientToken,
            container: '#dropin-container',
          },
          (error, instance) => {
            if (error) {
              console.error('Error initializing Braintree Drop-in:', error);
              return;
            }
            setBraintreeInstance(instance);
            setLoading(false);
          }
        );
      }
    }
  }, [clientToken]);

  // Calculate total price based on selected dates
  useEffect(() => {
    if (startDate && endDate && vehicleDetails) {
      const days =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      setPrice(vehicleDetails.vehicle?.price_per_day * days || 0);
    }
  }, [startDate, endDate, vehicleDetails]);

  const handleReservation = async () => {
    if (!braintreeInstance) {
      alert('Payment gateway not initialized.');
      return;
    }
    try {
      setLoading(true);

      const paymentMethodNonce = await braintreeInstance.requestPaymentMethod();

      // Format the dates to MM/DD/YYYY format
      const formattedStartDate = startDate?.toLocaleDateString('en-US'); // Format to MM/DD/YYYY
      const formattedEndDate = endDate?.toLocaleDateString('en-US'); // Format to MM/DD/YYYY

      const reservationData = {
        vehicle_id: vehicleDetails?.vehicle?.id,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        amount: price,
      };

      await createReservation(reservationData, paymentMethodNonce.nonce);
      alert('Reservation successful!');
      setLoading(false);
      navigate('/home/reservations');
    } catch (error) {
      setLoading(false);
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
    }
  };

  if (!vehicleDetails) {
    return <div>Loading vehicle details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Reserve {vehicleDetails.vehicle?.name}
      </h2>

      <div>
        <div className="carousel w-full">
          {/* First image (mandatory) */}
          <div id="item1" className="carousel-item w-full">
            <img
              src={vehicleDetails.vehicle?.picture1}
              alt="Vehicle Image 1"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Second image (optional) */}
          {vehicleDetails.vehicle?.picture2 && (
            <div id="item2" className="carousel-item w-full">
              <img
                src={vehicleDetails.vehicle?.picture2}
                alt="Vehicle Image 2"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Third image (optional) */}
          {vehicleDetails.vehicle?.picture3 && (
            <div id="item3" className="carousel-item w-full">
              <img
                src={vehicleDetails.vehicle?.picture3}
                alt="Vehicle Image 3"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Fourth image (optional) */}
          {vehicleDetails.vehicle?.picture4 && (
            <div id="item4" className="carousel-item w-full">
              <img
                src={vehicleDetails.vehicle?.picture4}
                alt="Vehicle Image 4"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          {vehicleDetails.vehicle?.picture2 && (
            <a href="#item2" className="btn btn-xs">
              2
            </a>
          )}
          {vehicleDetails.vehicle?.picture3 && (
            <a href="#item3" className="btn btn-xs">
              3
            </a>
          )}
          {vehicleDetails.vehicle?.picture4 && (
            <a href="#item4" className="btn btn-xs">
              4
            </a>
          )}
        </div>
      </div>

      <div className='w-full flex flex-row justify-between items-center'>
      <div>
        <div className="mb-4">
          <p>{vehicleDetails.description}</p>
          <p><strong>Mileage:</strong> {vehicleDetails.mileage}</p>
          <p><strong>Price per Day:</strong> ${vehicleDetails.vehicle?.price_per_day}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="start_date" className="block text-sm font-medium">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date || undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border p-2 w-full rounded"
          />

          <label htmlFor="end_date" className="block text-sm font-medium mt-4">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date || undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <p><strong>Total Price:</strong> ${price.toFixed(2)}</p>
        </div>
      </div>

      <div className='max-w-[500px] w-full'>
        <div id="dropin-container" className="mb-4"></div>
      </div>
      </div>

      <button
        onClick={handleReservation}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {loading ? 'Processing...' : 'Reserve Now'}
      </button>
    </div>
  );
};
