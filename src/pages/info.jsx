import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Info = () => {
    const { t, i18n } = useTranslation();
    let {id} = useParams();
    const navigate = useNavigate();
    const API = "http://localhost:3000/data";
    const [data, setData] = useState([])
    const [product, setProduct] = useState(null);
    const [card, setCard] = useState(() => {
        return JSON.parse(localStorage.getItem("card")) || [];
    });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    
    async function get() {
        try {
            let { data } = await axios.get(API);
            setData(data); 
            setProduct(data.find((el)=>el.id==id))
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        get()
    }, [id])

    const handleAddToCart = (product) => {
        let prToCard = JSON.parse(localStorage.getItem("card")) || [];
        let check = prToCard.find((elem) => elem.id === product.id);

        if (check) {
            prToCard = prToCard.map((elem) => {
                if (elem.id === product.id) {
                    return { ...elem, counter: elem.counter + 1 };
                }
                return elem;
            });
        } else {
            prToCard.push({ ...product, counter: 1 });
        }

        localStorage.setItem("card", JSON.stringify(prToCard));
        setCard(prToCard);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

  return (
    <div className='dark:bg-[#11122b]'>
        <div className='bg-[#F1F5F8] dark:bg-[#1a1b46] dark:text-[#ccc] p-[5%] text-[#235275] text-[25px] font-[600]'>
                <h1><samp>{t("home")}</samp> / <samp>{product.name}</samp></h1>
            </div>
            <div className='flex w-full flex-col md:flex-row  dark:bg-[#11122b] md:h-[85vh] md:items-center md:w-[100%] md:p-[5%] m-auto'>

        {
            
            product.images && (
                <div className="w-[90%] m-auto md:w-[48%] relative">
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
                    {product.images.map((image, index) => {
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
        <div className='flex flex-col gap-[10px] items-start w-[90%] m-auto md:w-[48%] md:justify-center'>
            <h1 className='text-[32px] italic text-[#222222] dark:text-[#fff]'>{product.name}</h1>
                <span className='text-[22px] italic text-[#23527580] dark:text-[#fff]'>BY {product.company.toUpperCase()}</span>
            <div className='flex items-center justify-between w-[100%]'>
                <h2 className='text-[28px] font-[700] text-[#235275] italic dark:text-[#fff]'>{product.price}</h2>
                <div className='flex gap-[10px]'>
                    {
                        product.coloros && product.coloros.map((el)=>{
                            return (
                                <i key={el} style={{background: el, color: el}} className='w-[30px] h-[30px] rounded-[3px] p-[10px]'>.</i>
                            )
                        })
                    }
                </div>
            </div>
            <p className='text-[#235275] dark:text-[#fff]'>{product.desc}</p>
            <button onClick={() => handleAddToCart(el)} className='text-[20px] font-[600] bg-[#BA5D2C] text-[white] rounded-[5px] py-[10px] px-[20px] mb-[150px]'>ADD TO CARD</button>
        </div>
            </div>
    </div>
  )
}

export default Info