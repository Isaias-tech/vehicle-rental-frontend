import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingPage } = await import('./pages/LandingPage');
        return { Component: LandingPage };
      },
      children: [
        {
          path: '/login',
          lazy: async () => {
            const { LoginPage } = await import('./pages/auth/LoginPage');
            return { Component: LoginPage };
          },
        },
        {
          path: '/register',
          lazy: async () => {
            const { RegisterPage } = await import('./pages/auth/RegisterPage');
            return { Component: RegisterPage };
          },
        },
      ],
    },
    {
      path: '/home',
      lazy: async () => {
        const { ProtectedRoute } = await import('./pages/ProtectedRoute');
        return { Component: ProtectedRoute };
      },
      children: [
        {
          path: '/home/search',
          lazy: async () => {
            const { SearchPage } = await import('./pages/private/SearchPage');
            return { Component: SearchPage };
          },
        },
        {
          path: '/home/profile',
          lazy: async () => {
            const { ProfilePage } = await import('./pages/private/ProfilePage');
            return { Component: ProfilePage };
          },
        },
        {
          path: '/home/reserve/:vehicle_id',
          lazy: async () => {
            const { ReservePage } = await import('./pages/private/ReservePage');
            return { Component: ReservePage };
          },
        },
        {
          path: '/home/reservations/',
          lazy: async () => {
            const { UserReservations } = await import(
              './pages/private/UserReservations'
            );
            return { Component: UserReservations };
          },
        },
      ],
    },
    {
      path: '/admin',
      lazy: async () => {
        const { AdminPage } = await import('./pages/private/admin/AdminPage');
        return { Component: AdminPage };
      },
      children: [
        {
          path: '/admin/profile',
          lazy: async () => {
            const { ProfilePage } = await import('./pages/private/ProfilePage');
            return { Component: ProfilePage };
          },
        },
        {
          path: '/admin/vehicles',
          lazy: async () => {
            const { VehicleManagement } = await import(
              './pages/private/admin/VehicleManagement'
            );
            return { Component: VehicleManagement };
          },
        },
        {
          path: '/admin/users',
          lazy: async () => {
            const { UserManagement } = await import(
              './pages/private/admin/UserManagement'
            );
            return { Component: UserManagement };
          },
        },
        {
          path: '/admin/reservations',
          lazy: async () => {
            const { ReservationsManagement } = await import(
              './pages/private/admin/ReservationsManagement'
            );
            return { Component: ReservationsManagement };
          },
        },
        {
          path: '/admin/reports',
          lazy: async () => {
            const { ReportsManagement } = await import(
              './pages/private/admin/ReportsManagement'
            );
            return { Component: ReportsManagement };
          },
        },
        {
          path: '/admin/frequent-clients',
          lazy: async () => {
            const { FrequentClients } = await import(
              './pages/private/admin/FrequentClients'
            );
            return { Component: FrequentClients };
          },
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
