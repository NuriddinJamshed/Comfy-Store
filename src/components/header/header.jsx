import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');

  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

const Header = () => {
  const [mode, setMode] = useState(1);
  const [sheet, setSheet] = useState(false);
  const [card, setCard] = useState(JSON.parse(localStorage.getItem('card')) || []);
  const [modal, setModal] = useState(false);
  const [total, setTotal] = useState(0)

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const updateCart = () => {
      setCard(JSON.parse(localStorage.getItem('card')) || []);
    };

    window.addEventListener('storage', updateCart);

    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  return (
    <header className='flex relative px-[5%] z-2 items-center w-[100%] dark:text-[#fff] dark:bg-[#110c20] m-auto justify-between h-[10vh] border-b border-gray-300'>
      {sheet && (
        <div onClick={() => setSheet(!sheet)} className='fixed w-[100%] h-[100vh] left-0 right-0 top-0 bg-[#0000005d]'>
          <div className='flex relative flex-col w-[70%] h-[100vh] dark:bg-[#121327] px-[20px] pt-[40px] bg-[#f0f0f0]'>
            <Link className='text-[20px] font-[600]' to={'/'}>{t('home')}</Link>
            <Link className='text-[20px] font-[600]' to={'/products'}>{t('product')}</Link>
            <Link className='text-[20px] font-[600]' to={'/about'}>{t('about')}</Link>
            <svg onClick={() => setSheet(!sheet)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-[20px] right-[30px] pointer-events-auto hover:cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </div>
        </div>
      )}
      {modal && (
        <div className='fixed z-20 w-[92%] p-[20px] top-[-5px] md:w-[30%] right-0 h-[100vh] bg-[#ffffff] dark:bg-[#120f27]'>
          <div>
            <p onClick={()=>setModal(!modal)} className='text-[30px]'>✖</p>
            <h1 className='text-center text-[28px] italic'>{t("bag")}</h1>
          </div>
          <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-[20px]'>
          {card.map((el) =>{
          return (
            <div className='flex justify-between items-start' key={el.id}>
              <img className='w-[40%] rounded-[5px]' src={el.images[0]} alt="" />
              <div className='flex-col w-[55%]'>
                <h1>{el.name}</h1>
                <p>{el.price}</p>
                <div className='flex justify-between items-center w-[50%]'>
                  <p className='text-[#BA5D2C] border-[1px] font-[700] px-[8px] border-[#BA5D2C]'>-</p>
                  <p>{el.counter}</p>
                  <p className='text-[#BA5D2C] border-[1px] font-[700] px-[8px] border-[#BA5D2C]'>+</p>
                </div>
              </div>
            </div>
          )})}
          </div>
          <div className='flex gap-[10px] flex-col'>
            <div className='flex justify-between w-[100%]'>
              <h1 className='text-[24px] font-[700] italic'>{t("total")} :</h1>
              <h1 className='text-[24px] font-[700] italic'>$ {total}</h1>
            </div>
              <button className='text-[20px] w-[100%] m-auto font-[600] bg-[#BA5D2C] text-[white] rounded-[5px] py-[10px] px-[20px] mb-[150px]'>{t("check")}</button>
          </div>
          </div>
        </div>
      )}
      <svg onClick={() => setSheet(!sheet)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 block md:hidden">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>
      <menu className='hidden md:flex items-center justify-between gap-[10px]'>
        <Link className='text-[20px] font-[600]' to={'/'}>{t('home')}</Link>
        <Link className='text-[20px] font-[600]' to={'/products'}>{t('product')}</Link>
        <Link className='text-[20px] font-[600]' to={'/about'}>{t('about')}</Link>
      </menu>
      <h1 className='text-[38px] font-charm font-[700] italic'>comfy</h1>
      <div className='flex items-center gap-[10px]'>
        <button
          onClick={() => {
            toggleTheme();
            setMode(mode + 1);
          }}
        >
          {mode % 2 !== 0 ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          )}
        </button>
        <div onClick={() => setModal(!modal)} className='flex relative items-center justify-center'>
          <p className='bg-[#BA5D2C] text-[12px] h-[20px] text-[white] rounded-[50%] py-[1px] px-[5px] absolute top-[-5px] right-0'>{card.length}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        <select onChange={(e) => changeLanguage(e.target.value)}>
          <option className='dark:text-[#000]' value="en">EN</option>
          <option className='dark:text-[#000]' value="ru">RU</option>
          <option className='dark:text-[#000]' value="tj">TJ</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
