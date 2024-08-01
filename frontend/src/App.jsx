import { useEffect, useRef } from 'react';
import css from './App.module.scss';
import { Player } from '@lordicon/react';
import CART from './assets/cart.json';
import CATALOG from './assets/catalog.json';
import PROFILE from './assets/profile.json';

const tg = window.Telegram.WebApp;

console.log(tg)

function App() {
  const catalogRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <div className={css['App-nav']}>
        <div className={css['App-nav-item']} onClick={() => catalogRef.current?.playFromBeginning()}>
          <Player
            ref={catalogRef}
            icon={CATALOG}
            size={32}
          />
          <p>каталог</p>
        </div>
        <div className={css['App-nav-item']}>
          <Player
            ref={cartRef}
            icon={CART}
            size={32}
          />
          <p>корзина</p>
        </div>
        <div className={css['App-nav-item']}>
          <Player
            ref={profileRef}
            icon={PROFILE}
            size={32}
          />
          <p>профиль</p>
        </div>
      </div>
    </>
  )
}

export default App
