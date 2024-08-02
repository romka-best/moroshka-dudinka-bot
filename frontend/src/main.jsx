import ReactDOM from 'react-dom/client';
import './index.css';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider, App } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router/Router.jsx';

const tg = window.Telegram.WebApp;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      locale={ruRU}
      theme={{
        "token": {
          "colorPrimary": tg?.themeParams?.bg_color ?? '#fff',
          "colorTextBase": tg?.themeParams?.text_color ?? '#000'
        },
      }}
    >
      <App>
        <Router />
      </App>
    </ConfigProvider>
  </Provider>,
);
