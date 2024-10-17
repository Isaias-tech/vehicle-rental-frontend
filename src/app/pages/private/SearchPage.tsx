import { useState, useEffect } from 'react';
import { getVehicles } from '../../../api/Vehicle.api';
import VehicleCard from '../../../components/ui/VehicleCard';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getVehicles(searchTerm);
      setVehicles(response.results);
    } catch (err) {
      setError('Error loading vehicles. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="h-full p-5">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex flex-row justify-between items-center sticky z-[800] top-20 bg-slate-300 p-3 rounded-md"
        >
          <div className="form-control w-[65%]">
            <input
              type="text"
              placeholder="Search for a vehicle by name:"
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control w-[20%]">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </form>

        {error && <div className="alert alert-error my-5">{error}</div>}

        <div className="w-full flex flex-wrap gap-4 justify-center items-center">
          {vehicles?.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))
          ) : (
            <p className="text-gray-500">No vehicles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
