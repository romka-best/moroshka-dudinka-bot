import css from './App.module.scss';
import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

console.log(tg)

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <div className={css['App-nav']}>

      </div>
    </>
  )
}

export default App
