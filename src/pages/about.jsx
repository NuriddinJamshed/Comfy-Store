import React from 'react'
import { useTranslation } from 'react-i18next';

const About = () => {
        const { t, i18n } = useTranslation();
        
          const changeLanguage = (language) => {
            i18n.changeLanguage(language);
          };
  return (
    <div  className='dark:bg-[#1c1233] dark:text-[#fff]'>
        <div className='bg-[#F1F5F8] dark:bg-[#1a1b46] dark:text-[#ccc] p-[5%] text-[#235275] text-[25px] font-[600]'>
            <h1><samp>{t("home")}</samp> / <samp>{t("about")}</samp></h1>
        </div>
        <h1 className='text-[40px] font-[700] text-center mt-[100px]'><samp className='text-[#C77B53]'>/</samp> {t("our history")}</h1>
        <p className='w-[90%] m-auto text-center mt-[100px] text-[22px] text-[#235275] dark:text-[#fff] pb-[30vh]'>{t("aboutUs")}</p>
    </div>
  )
}

export default About