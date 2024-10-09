import { Navigate, Outlet } from 'react-router-dom';

export const ProtectorRoutes = () => {
  const user = true;
  if (user) {
    return <Outlet />;
  }

  return <Navigate to={'/'} replace />;
};
