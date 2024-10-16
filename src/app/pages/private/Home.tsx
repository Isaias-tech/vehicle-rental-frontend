import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { logout } from '../../../api/userAccount.api';

export const Home = () => {
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
