import css from './App.module.scss';
import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

useEffect(() => {
  tg.ready();
}, []);

console.log(tg)

function App() {

  return (
    <>
      <div className={css['App-nav']}>

      </div>
    </>
  )
}

export default App
