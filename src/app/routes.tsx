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
