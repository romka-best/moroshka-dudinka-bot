import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { getUser } from './store/user/actions';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import css from './App.module.scss';
import { Player } from '@lordicon/react';

import CatalogIcon from './assets/catalog.json';
import CartIcon from './assets/cart.json';
import ProfileIcon from './assets/profile.json';
import { selectUser } from './store/user/selector';
import { getCartById } from './store/cart/actions';
import { selectCart } from './store/cart/selector';

const tg = window.Telegram.WebApp;

const { Item: TabItem } = TabBar;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Иконки
  const catalogRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { count } = useSelector(selectCart);

  useLayoutEffect(() => {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes();
    dispatch(getUser(tg.initDataUnsafe?.user?.id));
  }, []);

  useEffect(() => {
    user?.cart?.id && dispatch(getCartById(user?.cart?.id));
  }, [user?.cart]);

  const getTabColor = (tabPathname) => {
    if (tabPathname === '/catalog' && location?.pathname === '/') {
      return 'var(--adm-color-primary)';
    }

    if (location?.pathname === tabPathname) {
      return 'var(--adm-color-primary)';
    } else {
      return 'var(--adm-color-text-secondary)';
    }
  };

  const tabs = useMemo(() => ([
    {
      key: '/catalog',
      title: 'Каталог',
      icon: (
        <Player
          icon={CatalogIcon}
          ref={catalogRef}
          colorize={getTabColor('/catalog')}
        />
      )
    },
    {
      key: '/cart',
      title: 'Корзина',
      icon: (
        <Player
          icon={CartIcon}
          ref={cartRef}
          colorize={getTabColor('/cart')}
        />
      ),
      badge: count,
    },
    {
      key: '/profile',
      title: 'Профиль',
      icon: (
        <Player
          icon={ProfileIcon}
          ref={profileRef}
          colorize={getTabColor('/profile')}
        />
      )
    },
  ]), [count, getTabColor, profileRef, cartRef, catalogRef]);

  const tabsItems = useMemo(() => (
    tabs?.map(tab => <TabItem key={tab.key} icon={tab.icon} title={tab.title} badge={tab?.badge} />)
  ), [tabs, count]);

  const handleChangeTab = (route) => {
    navigate(route);

    switch (route) {
      case '/catalog':
        catalogRef.current?.playFromBeginning();
        break;

      case '/cart':
        cartRef.current?.playFromBeginning();
        break;

      case '/profile':
        profileRef.current?.playFromBeginning();
        break;

      default:
        break;
    }
  };

  const activeTab = useMemo(() => {
    if (location?.pathname === '/') {
      return '/catalog';
    } else {
      return location?.pathname;
    }
  }, [location?.pathname]);

  return (
    <div className={css['App']}>
      <div className={css['App-body']}>
        <Outlet />
      </div>
      <TabBar
        activeKey={activeTab}
        className={css['App-navbar']}
        onChange={handleChangeTab}
        safeArea
      >
        {tabsItems}
      </TabBar>
    </div>
  )
}

export default App
