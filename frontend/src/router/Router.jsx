import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';

import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <App />
      ),
      children: [
        {
          path: '/',
          element: <Navigate to={'/products'} replace={true} />,
        },
        {
          path: '/products',
          element: <Products />,
          index: true,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
