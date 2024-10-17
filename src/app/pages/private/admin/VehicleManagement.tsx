import { useState, useEffect } from 'react';
import { getVehicles, deleteVehicle } from '../../../../api/Vehicle.api';
import { Vehicle } from '../../../../types/Vehicle';
import { AddVehicle } from '../../../../components/ui/AddVehicleModal';
import { UpdateVehicle } from '../../../../components/ui/UpdateVehicleModal';

export const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchVehicles = async (page: number = 1) => {
    setLoading(true);
    try {
      const { results, count } = await getVehicles('', page);
      setVehicles(results);
      setCurrentPage(page);

      const pageSize = 10;
      setTotalPages(Math.ceil(count / pageSize));
    } catch (err: any) {
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicle(id);
      setIsDeleteModalOpen(false);
      fetchVehicles(currentPage);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError('Failed to delete vehicle.');
    }
  };

  const handleUpdate = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsUpdateModalOpen(true);
  };

  const confirmDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteModalOpen(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchVehicles(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchVehicles(currentPage - 1);
    }
  };

  return (
    <div className="w-full max-h-full p-6">
      <div className="w-full px-5 flex flex-row justify-between">
        <h1 className="text-xl font-bold mb-4">Vehicle Management</h1>

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Vehicle
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Main picture</th>
                <th>Name</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-9 w-9">
                        <img src={vehicle.picture1} alt="Vehicle Image" />
                      </div>
                    </div>
                  </td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.price}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleUpdate(vehicle)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => confirmDelete(vehicle)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <AddVehicle
          onClose={() => {
            setIsAddModalOpen(false);
            fetchVehicles(); // Reload data after closing Add modal
          }}
        />
      )}

      {/* Update Vehicle Modal */}
      {isUpdateModalOpen && selectedVehicle && (
        <UpdateVehicle
          vehicle={selectedVehicle}
          onClose={() => {
            setIsUpdateModalOpen(false);
            fetchVehicles(); // Reload data after closing Update modal
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedVehicle && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p>Are you sure you want to delete {selectedVehicle.name}?</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(selectedVehicle.id!)}
              >
                Delete
              </button>
              <button
                className="btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
