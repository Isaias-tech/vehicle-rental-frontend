import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUser, logout } from '../../../../api/userAccount.api';
import Navbar from '../../../../components/layout/Navbar';

export const AdminPage = () => {
  const navigate = useNavigate();

  const checkAccessToken = async () => {
    const token = Cookies.get('access');
    if (token) {
      try {
        const user = await getUser();
        if (user.role == 'EMPLOYEE' || user.role == 'CLIENT') {
          navigate('/home/search');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <>
      <div className="min-h-screen h-screen">
        <div className="h-full flex flex-row">
          <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
            <div className="p-4 text-2xl font-bold text-center">Admin</div>
            <nav className="flex flex-col mt-8">
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/admin/reservations"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Reservations & Transactions
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Users management
              </NavLink>
              <NavLink
                to="/admin/vehicles"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Vehicles management
              </NavLink>
              <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Reports
              </NavLink>
              <NavLink
                to="/admin/frequent-clients"
                className={({ isActive }) =>
                  `py-2 px-6 text-lg font-medium hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                Frequent clients
              </NavLink>
            </nav>
          </aside>

          <main className="flex-grow bg-white max-h-full overflow-auto">
            <Navbar>
              <div className="flex flex-row w-[50%] justify-end items-center">
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </Navbar>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
