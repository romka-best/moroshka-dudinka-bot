import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      locale={ruRU}
    >
      <App />

    </ConfigProvider>
  </Provider>,
)
