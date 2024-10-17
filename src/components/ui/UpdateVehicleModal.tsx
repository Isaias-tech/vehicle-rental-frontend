import React, { useState } from 'react';
import { updateVehicle } from '../../api/Vehicle.api';
import { Vehicle } from '../../types/Vehicle';

interface UpdateVehicleProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export const UpdateVehicle: React.FC<UpdateVehicleProps> = ({
  vehicle: initialVehicle,
  onClose,
}) => {
  const [vehicle, setVehicle] =
    useState<Omit<Vehicle, 'picture1' | 'picture2' | 'picture3' | 'picture4'>>(
      initialVehicle
    );
  const [picture1, setPicture1] = useState<File | null>(null);
  const [picture2, setPicture2] = useState<File | null>(null);
  const [picture3, setPicture3] = useState<File | null>(null);
  const [picture4, setPicture4] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', vehicle.name);
    formData.append('make', vehicle.make);
    formData.append('model', vehicle.model);
    formData.append('year', vehicle.year.toString());
    formData.append('is_available', vehicle.is_available.toString());
    formData.append('price', vehicle.price.toString());
    formData.append('price_per_day', vehicle.price_per_day.toString());
    formData.append('price_per_week', vehicle.price_per_week.toString());
    formData.append('price_per_month', vehicle.price_per_month.toString());

    if (picture1) {
      formData.append('picture1', picture1);
    }

    if (picture2) formData.append('picture2', picture2);
    if (picture3) formData.append('picture3', picture3);
    if (picture4) formData.append('picture4', picture4);

    try {
      await updateVehicle(initialVehicle.id!, formData);
      console.log('Vehicle updated successfully:', vehicle);
      onClose();
    } catch (error: any) {
      setError('Failed to update vehicle. Please try again.');
      console.error('Error updating vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Vehicle</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-control">
            <label className="label">Vehicle Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={vehicle.name}
              onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Make</label>
            <input
              type="text"
              className="input input-bordered"
              value={vehicle.make}
              onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Model</label>
            <input
              type="text"
              className="input input-bordered"
              value={vehicle.model}
              onChange={(e) =>
                setVehicle({ ...vehicle, model: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Year</label>
            <input
              type="number"
              className="input input-bordered"
              value={vehicle.year}
              onChange={(e) =>
                setVehicle({ ...vehicle, year: +e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              className="input input-bordered"
              value={vehicle.price}
              onChange={(e) =>
                setVehicle({ ...vehicle, price: +e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Price Per Day</label>
            <input
              type="number"
              className="input input-bordered"
              value={vehicle.price_per_day}
              onChange={(e) =>
                setVehicle({ ...vehicle, price_per_day: +e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Price Per Week</label>
            <input
              type="number"
              className="input input-bordered"
              value={vehicle.price_per_week}
              onChange={(e) =>
                setVehicle({ ...vehicle, price_per_week: +e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Price Per Month</label>
            <input
              type="number"
              className="input input-bordered"
              value={vehicle.price_per_month}
              onChange={(e) =>
                setVehicle({ ...vehicle, price_per_month: +e.target.value })
              }
              required
            />
          </div>

          {/* File input for optional pictures */}
          <div className="form-control">
            <label className="label">Picture 1 (Optional)</label>
            <input
              type="file"
              className="file-input file-input-bordered"
              onChange={(e) =>
                setPicture1(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="form-control">
            <label className="label">Picture 2 (Optional)</label>
            <input
              type="file"
              className="file-input file-input-bordered"
              onChange={(e) =>
                setPicture2(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="form-control">
            <label className="label">Picture 3 (Optional)</label>
            <input
              type="file"
              className="file-input file-input-bordered"
              onChange={(e) =>
                setPicture3(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="form-control">
            <label className="label">Picture 4 (Optional)</label>
            <input
              type="file"
              className="file-input file-input-bordered"
              onChange={(e) =>
                setPicture4(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          {error && <div className="alert alert-error mt-4">{error}</div>}

          <div className="modal-action">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
