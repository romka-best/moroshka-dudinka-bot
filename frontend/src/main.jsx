import ReactDOM from 'react-dom/client';
import './index.css';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider, App } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router/Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      locale={ruRU}
      theme={{
        "token": {
          "colorPrimary": "var(--tg-theme-bg-color)",
          "colorTextBase": "var(--tg-theme-text-color)"
        },
      }}
    >
      <App>
        <Router />
      </App>
    </ConfigProvider>
  </Provider>,
);
