import { useEffect } from 'react';
import css from './App.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

const tg = window.Telegram.WebApp;

console.log(tg)

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <div className={css['App-nav']}>
        <div className={css['App-nav-item']}>
          <ShoppingCartOutlined />
          <p>каталог</p>
        </div>
        <div className={css['App-nav-item']}>
          <ShoppingCartOutlined />
          <p>корзина</p>
        </div>
        <div className={css['App-nav-item']}>
          <ShoppingCartOutlined />
          <p>корзина</p>
        </div>
      </div>
    </>
  )
}

export default App
