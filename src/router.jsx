import { createBrowserRouter } from 'react-router-dom';
import { Home, Login, Orders, Register } from './views';
import { AuthLayout, Layout, AdminLayout } from './layouts';
import { Products } from './views/admin/Products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // '/'
        element: <Home />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
      {
        path: '/admin/products',
        element: <Products />,
      },
    ],
  },
]);
