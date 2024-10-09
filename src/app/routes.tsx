import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '',
      lazy: async () => {
        const { Landing } = await import('./pages/Landing');
        return { Component: Landing };
      },
    },
    {
      path: '/login',
      lazy: async () => {
        const { Login } = await import('./pages/auth/Login');
        return { Component: Login };
      },
    },
    {
      path: '/sign-up',
      lazy: async () => {
        const { SignUp } = await import('./pages/auth/SignUp');
        return { Component: SignUp };
      },
    },
    {
      path: '/home',
      lazy: async () => {
        const { ProtectorRoutes } = await import('./pages/ProtectecRoutes');
        return { Component: ProtectorRoutes };
      },
      children: [
        {
          path: '/home',
          lazy: async () => {
            const { Home } = await import('./pages/private/Home');
            return { Component: Home };
          },
          children: [
            {
              path: '/home/search',
              lazy: async () => {
                const { SearchPage } = await import(
                  './pages/private/SearchPage'
                );
                return { Component: SearchPage };
              },
            },
            {
              path: '/home/reservations',
              lazy: async () => {
                const { Reservations } = await import(
                  './pages/private/Reservations'
                );
                return { Component: Reservations };
              },
            },
            {
              path: '/home/profile',
              lazy: async () => {
                const { Profiles } = await import('./pages/private/Profiles');
                return { Component: Profiles };
              },
            },
            {
              path: '/home/checkout',
              lazy: async () => {
                const { CheckOut } = await import('./pages/private/CheckOut');
                return { Component: CheckOut };
              },
            },
            {
              path: '/home/employee/clients',
              lazy: async () => {
                const { Clients } = await import('./pages/private/Clients');
                return { Component: Clients };
              },
            },
            {
              path: '/home/employee/carreport',
              lazy: async () => {
                const { CarReports } = await import(
                  './pages/private/CarReport'
                );
                return { Component: CarReports };
              },
            },
          ],
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFound } = await import('./pages/NotFound');
        return { Component: NotFound };
      },
    },
  ]);
};

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
