import { Vehicle } from "../../types/Vehicle.interface";

interface CarCardProps {
  vehicle: Vehicle;
}

const CarCard = ({ vehicle }: CarCardProps) => {
  return (
    <div className="card shadow-xl w-80 m-4">
      <figure>
        <img
          src={vehicle.image1}
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.name}</h2>
        <p>{vehicle.model}</p>
        <p>{vehicle.year}</p>
        <p className="text-lg font-bold">${vehicle.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
