import { useEffect, useState } from 'react';
import { getVehicleList } from '../../../api/vehicles.api';
import { Vehicle } from '../../../types/Vehicle.interface';

export const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await getVehicleList();
      setVehicles(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <main className="container w-full min-h-[71.4vh] h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <button
          className="btn btn-primary"
        >
          Create New Vehicle
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
