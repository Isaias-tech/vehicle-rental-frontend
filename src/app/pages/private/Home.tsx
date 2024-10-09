import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <main className="container">
      Home page
      <Outlet />
    </main>
  );
};
