import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types/Vehicle';

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const navigate = useNavigate();

  const handleReserveNow = () => {
    // Navigate to the reserve page and pass vehicle information via state
    navigate(`/home/reserve/${vehicle.id}`, { state: { vehicle } });
  };

  return (
    <div className="card bg-base-100 w-80 shadow-xl">
      <figure>
        <img src={vehicle.picture1} alt={vehicle.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.name}</h2>
        <p>
          <strong>Vehicle price: </strong>${vehicle.price}
        </p>
        <p>
          <strong>Price per day: </strong>${vehicle.price_per_day}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleReserveNow}>
            Reserve now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
