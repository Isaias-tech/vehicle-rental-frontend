import { ReactNode, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../api/UserAccount.api';
import Cookies from 'js-cookie';

export const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const navigate = useNavigate();

  const checkAccessToken = async () => {
    const token = Cookies.get('access');
    if (token) {
      try {
        const user = await getUser();
        if (user.role == 'ADMINISTRATOR' || user.role == 'MANAGER') {
          navigate('/admin/profile');
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
      <Navbar>
        <div className="flex flex-row w-[70%] justify-evenly items-center">
          <Link to="/home/reservations">Reservations</Link>
          <Link to="/home/profile">Profile</Link>
          <Link to="/home/search">Search</Link>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Navbar>
      <main>{children}</main>
    </>
  );
};
