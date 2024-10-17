import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { logout } from '../../../api/userAccount.api';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar>
        <div className='w-full flex flex-row justify-end items-center'>
        <NavLink to="/home/admin/profile" className="text-white mr-10">
          Profile
        </NavLink>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </Navbar>
      <div className="flex h-[72.7vh]">
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
          <div className="p-4 text-2xl font-bold text-center">
            Admin Dashboard
          </div>
          <nav className="flex flex-col mt-8">
            <NavLink
              to="/home/admin/reservations"
              className={({ isActive }) =>
                `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              Reservations & Transactions
            </NavLink>
            <NavLink
              to="/home/admin/users"
              className={({ isActive }) =>
                `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              Users management
            </NavLink>
            <NavLink
              to="/home/admin/vehicles"
              className={({ isActive }) =>
                `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              Vehicles management
            </NavLink>
            <NavLink
              to="/home/admin/reports"
              className={({ isActive }) =>
                `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              Reports
            </NavLink>
          </nav>
        </aside>

        <div className="flex-grow p-6 bg-white">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
