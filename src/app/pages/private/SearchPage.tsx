import CarCard from "../../../components/ui/CarCard";

export const SearchPage = () => {
  return (
    <section>
      <div className="w-full flex flex-row justify-evenly items-center m-2">
        <label className="input input-bordered flex items-center gap-2 w-[80%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
          </svg>
          <input type="text" className="grow" placeholder="Search" />
        </label>
        <div className="card-actions justify-evenly">
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-evenly items-center">
        <CarCard />
        
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
    </section>
  );
};
