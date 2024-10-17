import { useState, useEffect } from 'react';
import CarCard from '../../../components/ui/CarCard';
import { Vehicle, VehicleSearchParams } from '../../../types/Vehicle.interface';
import { getVehicleList } from '../../../api/vehicles.api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SearchPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async (params?: VehicleSearchParams) => {
    try {
      const fetchedVehicles = await getVehicleList(params);
      setVehicles(fetchedVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleSearch = () => {
    const params: VehicleSearchParams = {
      name_contains: searchTerm,
    };

    if (startDate) {
      params.from_date = startDate.toISOString().split('T')[0];
    }

    if (endDate) {
      params.to_date = endDate.toISOString().split('T')[0];
    }

    fetchVehicles(params);
  };

  return (
    <section>
      <div className="w-full flex flex-row justify-evenly items-center m-2">
        <label className="input input-bordered flex items-center gap-2 w-[50%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search by vehicle name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <div className="w-[40%]">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) =>
              setDateRange(update as [Date | undefined, Date | undefined])
            }
            isClearable={true}
            placeholderText="Select availability range"
            className="input input-bordered w-full"
          />
        </div>

        <div className="card-actions justify-evenly">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-evenly items-center">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <CarCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <p className="text-center text-gray-500">No vehicles found</p>
        )}
      </div>
    </section>
  );
};
