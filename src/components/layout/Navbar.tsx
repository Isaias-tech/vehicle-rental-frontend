import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({children}: {children: ReactNode | ReactNode[]}) => {
  return (
    <div className="navbar bg-slate-900 text-gray-100 sticky z-[900] top-0">
      <div className="navbar-start">
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-xl">AI Vehicle Rental</Link>
        </div>
      </div>
      <div className="navbar-end flex flex-row justify-between items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
