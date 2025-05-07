import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Home = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const API = "http://localhost:3000/data";

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  async function get(){
    try {
        let {data} = await axios.get(API)
        setData(data)
        console.log(data);
        
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{
    get()
  }, [])
  return (
    <div className='w-[100%] dark:bg-[#15112c] dark:text-[#fff]'>
        <header className="text-[white] bg-[#063106] group-1 h-[90vh] w-[100%] flex flex-col items-start gap-[15px] justify-center m-[auto] p-[5%]">
            <h1 className='font-[700] text-[76px] italic'>{t("rest")}</h1>
            <p className='text-[40px] font-[500]'>{t("choices")}</p>
            <Link to={"/products"} className='text-[20px] font-[600] py-[10px] px-[20px] border-[1px] border-[#fff]'>{t("show")}</Link>
        </header>
        <h1 className='text-[40px] font-[700] text-center mt-[50px]'><samp className='text-[#C77B53]'>/</samp> {t("featured")}</h1>
        <div className='flex flex-col items-center gap-[50px]'>
            <div className='w-[90%] m-auto flex flex-col items-center text-center gap-[30px] mt-[30px] md:flex-row justify-center'>
                {
                    data.slice(0, 3).map((el)=>{
                        return (
                              <div className="group w-[90%] relative flex flex-col gap-[20px] md:w-[32%]" key={el.id}>
                                {
                                  el.images && (
                                    <div className="w-full relative">
                                      <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                          delay: 2500,
                                          disableOnInteraction: false,
                                        }}
                                        pagination={{
                                          clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        className="mySwiper"
                                      >
                                        {el.images.map((image, index) => {
                                          return (
                                            <SwiperSlide key={index}>
                                              <img src={image} alt="" className="w-full h-full object-cover" />
                                            </SwiperSlide>
                                          );
                                        })}
                                      </Swiper>
                                    </div>
                                  )
                                }
                            <div className="absolute top-0 right-0 flex justify-center z-10 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to={`/products/${el.id}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 bg-blue-500 text-white p-3 m-2 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                              </svg>
                            </Link>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 bg-green-500 text-white p-3 m-2 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                              </svg>
                            </div>
                            <h2 className="text-[16px] text-[gray] dark:text-[#fff]">{el.name}</h2>
                            <h2 className="font-[700] text-[22px]">${el.price}</h2>
                            </  div>
                        );
                    })
                }
            </div> 
            <Link to={"/products"} className='text-[20px] font-[600] bg-[#BA5D2C] text-[white] rounded-[5px] py-[10px] px-[20px] mb-[150px]'>{t("allProduct")}</Link>
        </div>
    </div>
  )
}

export default Home