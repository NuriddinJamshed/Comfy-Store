import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header/header'
import { useTranslation } from 'react-i18next';

const Layout = () => {
      const { t, i18n } = useTranslation();
      
        const changeLanguage = (language) => {
          i18n.changeLanguage(language);
        };
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout