import { useEffect, useRef } from 'react';
import css from './App.module.scss';
import { Player } from '@lordicon/react';
import CART from './assets/cart.json';
import CATALOG from './assets/catalog.json';
import PROFILE from './assets/profile.json';
import { Outlet, useNavigate } from 'react-router-dom';

const tg = window.Telegram.WebApp;

console.log(tg)

function App() {
  const navigate = useNavigate();

  // icons
  const catalogRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  const onClickNav = (route, ref) => {
    ref?.current?.playFromBeginning();
    navigate(route);
  };

  return (
    <div className={css['App']}>
      <Outlet />
      <div className={css['App-nav']}>
        <div className={css['App-nav-item']} onClick={() => onClickNav('/products', catalogRef)}>
          <Player
            ref={catalogRef}
            icon={CATALOG}
            size={32}
            colorize='var(--tg-theme-button-text-color)'
          />
          <p>каталог</p>
        </div>
        <div className={css['App-nav-item']} onClick={() => onClickNav('/cart', cartRef)}>
          <Player
            ref={cartRef}
            icon={CART}
            size={32}
            colorize='var(--tg-theme-button-text-color)'
          />
          <p>корзина</p>
        </div>
        <div className={css['App-nav-item']} onClick={() => onClickNav('/profile', profileRef)}>
          <Player
            ref={profileRef}
            icon={PROFILE}
            size={32}
            colorize='var(--tg-theme-button-text-color)'
          />
          <p>профиль</p>
        </div>
      </div>
    </div>
  )
}

export default App
