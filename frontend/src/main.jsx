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
          "colorPrimary": tg?.themeParams?.bg_color ?? '#DE3163',
          "colorTextBase": tg?.themeParams?.text_color ?? '#000'
        },
        "components": {
          "Button": {
            "defaultShadow": "",
            "primaryShadow": "",
            "dangerShadow": "",
            "colorPrimary": tg?.themeParams?.button_color,
            "colorText": tg?.themeParams?.button_text_color
          },
          "Input": {
            "algorithm": true,
            "colorBgContainer": tg?.themeParams?.bg_color ?? '#FFF'
          }
        }
      }}
    >
      <App>
        <Router />
      </App>
    </ConfigProvider>
  </Provider>,
);
