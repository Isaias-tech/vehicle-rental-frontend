import { Vehicle } from "../../types/Vehicle";

const VehicleCard = ({vehicle}: {vehicle: Vehicle}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={vehicle.picture1}
          alt={vehicle.picture1}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.name}</h2>
        <p><strong>Vehicle price: </strong>{vehicle.price}</p>
        <p><strong>Is available: </strong>{vehicle.is_available ? "Yes" : "No"}</p>
        <p><strong>Price per day: </strong>{vehicle.price_per_month}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Reserve now</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
