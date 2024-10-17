import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from './private/Layout';

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('access');

  const checkAuth = async () => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
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
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  return <Navigate to="/login" />;
};
