import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Catalog from './pages/Catalog/index.jsx';
import { ConfigProvider } from 'antd-mobile';
import ruRU from 'antd-mobile/es/locales/ru-RU';
import Cart from './pages/Cart/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Category from './pages/Category/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Catalog />,
        index: true,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'category/:id/:name',
        element: <Category />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>,
)
