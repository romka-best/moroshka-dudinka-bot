import { useEffect, useRef } from 'react';
import css from './App.module.scss';
import { Player } from '@lordicon/react';
import CART from './assets/cart.json';
import CATALOG from './assets/catalog.json';
import PROFILE from './assets/profile.json';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './store/user/userSlice';
import classNames from 'classnames';
import { Badge } from 'antd';

const tg = window.Telegram.WebApp;

console.log(tg)

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const catalogRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const isCatalogActive = location.pathname === '/products';
  const isCartActive = location.pathname === '/cart';
  const isProfileActive = location.pathname === '/profile';

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes();
    console.log(tg.initDataUnsafe, 'tg.initDataUnsafe')
    // dispatch(getUser(tg.initDataUnsafe));
  }, []);

  const onClickNav = (route, ref) => {
    ref?.current?.playFromBeginning();
    location.pathname !== route && navigate(route);
    tg.HapticFeedback.impactOccurred('light');
  };

  return (
    <div className={css['App']}>
      <Outlet />
      <div className={css['App-nav']}>
        <div
          className={
            classNames(
              css['App-nav-item'],
              isCatalogActive && css['App-nav-item-active']
            )
          }
          onClick={() => onClickNav('/products', catalogRef)}
        >
          <Player
            ref={catalogRef}
            icon={CATALOG}
            size={32}
            colorize={
              isCatalogActive
                ? 'var(--tg-theme-accent-text-color)'
                : 'var(--tg-theme-text-color)'
            }
          />
          <p>каталог</p>
        </div>
        <div
          className={
            classNames(
              css['App-nav-item'],
              isCartActive && css['App-nav-item-active']
            )
          }
          onClick={() => onClickNav('/cart', cartRef)}
        >
          <Badge offset={[0, 5]}>
            <Player
              ref={cartRef}
              icon={CART}
              size={32}
              colorize={
                isCartActive
                  ? 'var(--tg-theme-accent-text-color)'
                  : 'var(--tg-theme-text-color)'
              }
            />
          </Badge>
          <p>корзина</p>
        </div>

        <div
          className={
            classNames(
              css['App-nav-item'],
              isProfileActive && css['App-nav-item-active']
            )
          }
          onClick={() => onClickNav('/profile', profileRef)}
        >
          <Player
            ref={profileRef}
            icon={PROFILE}
            size={32}
            colorize={
              isProfileActive
                ? 'var(--tg-theme-accent-text-color)'
                : 'var(--tg-theme-text-color)'
            }
          />
          <p>профиль</p>
        </div>
      </div>
    </div >
  );
};

export default App;
