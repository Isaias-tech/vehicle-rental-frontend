import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserData } from '../../api/userAccount.api';

export const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('accessToken');

  const checkAuth = async () => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      await getUserData();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-ghost loading">Loading...</button>
      </div>
    ); 
  }

  if (isAuthenticated) {
    return <Outlet />; 
  }

  return <Navigate to="/login" />; 
};
