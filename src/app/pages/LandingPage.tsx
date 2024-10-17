import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { useEffect } from 'react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <>
      <Navbar>
        <div className="flex flex-row w-[50%] justify-evenly items-center">
          <button
            onClick={handleRegister}
            className="btn btn-outline btn-primary"
          >
            Register
          </button>
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </Navbar>
      <main className="flex flex-col items-center justify-center mt-10">
        <Outlet />
      </main>
    </>
  );
};
