const Navbar = () => {
  return (
    <div className="navbar bg-slate-900 text-gray-100 ">
      <div className="navbar-start">
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">AI Vehicle Rental</a>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="w-[50%] flex flex-row justify-between text-center items-center mr-8">
          <li>
          <button className="btn btn-link">Home</button>
          </li>
          <li>
          <button className="btn btn-outline btn-info">Sign up</button>
          </li>
          <li>
            <button className="btn btn-primary">Sign up</button>
          </li>
        </ul>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
