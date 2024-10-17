import { ReactNode } from 'react';
import Navbar from '../../../components/layout/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../api/UserAccount.api';

export const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Navbar>
        <div className="flex flex-row w-[50%] justify-evenly items-center">
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
