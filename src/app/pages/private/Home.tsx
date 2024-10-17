import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { getUserData, logout } from '../../../api/userAccount.api';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userData = async () => {
    const user = await getUserData();
    setIsAdmin(user.role === 'Administrator');
  }

  useEffect(() => {
    if (isAdmin) {
      navigate('/home/admin');
    } else {
      navigate('/home/search');
    }
  }, [isAdmin]);

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <Navbar>
        <div className='w-full flex justify-end'>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Navbar>
      <main className="w-full h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
