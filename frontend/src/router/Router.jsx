import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App />
    ),
    index: true,
    // children: [
    // ]
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
