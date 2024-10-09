import { Navigate, Outlet } from 'react-router-dom';

export const ProtectorRoutes = () => {
  const user = true;
  const isAdmin = true;
  if (isAdmin) {
    return <Outlet />;
  }
  if (user) {
    return <Outlet />;
  }

  return <Navigate to={'/'} replace />;
};
