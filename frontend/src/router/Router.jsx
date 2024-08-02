import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import { useDispatch } from 'react-redux';
import { getProducts } from '../store/products/productsSlice';

import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

const Router = () => {
  const dispatch = useDispatch();

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
          loader: () => dispatch(getProducts({})),
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
