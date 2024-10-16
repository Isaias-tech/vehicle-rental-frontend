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
      path: '/register',
      lazy: async () => {
        const { SignUp } = await import('./pages/auth/SignUp');
        return { Component: SignUp };
      },
    },
    {
      path: '/home',
      lazy: async () => {
        const { ProtectedRoutes } = await import('./pages/ProtectedRoutes');
        return { Component: ProtectedRoutes };
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
              path: '/home/moreinformation',
              lazy: async () => {
                const { CarMoreInformation } = await import(
                  './pages/private/CarMoreInformation'
                );
                return { Component: CarMoreInformation };
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
            {
              path: '/home/employee/client-details',
              lazy: async () => {
                const { ClientsInformation } = await import(
                  './pages/private/ClientsInformation'
                );
                return { Component: ClientsInformation };
              },
            },
          ],
        },
        {
          path: '/home/admin',
          lazy: async () => {
            const { Dashboard } = await import('./pages/admin/Dashboard');
            return { Component: Dashboard };
          },
          children: [
            {
              path: '/home/admin/vehicles-management',
              lazy: async () => {
                const { VehiclesManagement } = await import(
                  './pages/admin/VehiclesManagement'
                );
                return { Component: VehiclesManagement };
              },
            },
            {
              path: '/home/admin/clients-management',
              lazy: async () => {
                const { ClientsManagement } = await import(
                  './pages/admin/ClientsManagement'
                );
                return { Component: ClientsManagement };
              },
            },
            {
              path: '/home/admin/reservations-management',
              lazy: async () => {
                const { ReservationsManagement } = await import(
                  './pages/admin/ReservationsManagement'
                );
                return { Component: ReservationsManagement };
              },
            },
            {
              path: '/home/admin/reports-management',
              lazy: async () => {
                const { ReportsManagement } = await import(
                  './pages/admin/ReportsManagement'
                );
                return { Component: ReportsManagement };
              },
            },
            {
              path: '/home/admin/employees-management',
              lazy: async () => {
                const { EmployeesManagement } = await import(
                  './pages/admin/EmployeesManagement'
                );
                return { Component: EmployeesManagement };
              },
            },
            {
              path: '/home/admin/managers-management',
              lazy: async () => {
                const { ManagersManagement } = await import(
                  './pages/admin/ManagersManagement'
                );
                return { Component: ManagersManagement };
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
