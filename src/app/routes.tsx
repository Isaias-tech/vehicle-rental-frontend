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
        }
      ]
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
