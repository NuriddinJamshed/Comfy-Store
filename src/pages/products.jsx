import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Products = () => {
    const { t, i18n } = useTranslation();
    const [data1, setData1] = useState([]); 
    const [allData, setAllData] = useState([]); 
    const API = "http://localhost:3000/data";
    const [price, setPrice] = useState("100");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");


    const [card, setCard] = useState(() => {
        return JSON.parse(localStorage.getItem("card")) || [];
    });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    async function get() {
        try {
            let { data } = await axios.get(API);
            setAllData(data); 
            setData1(data); 
        } catch (error) {
            console.error(error);
        }
    }

    function apply() {
        let filtered = allData;

        if (category !== "all") {
            filtered = filtered.filter((el) => el.company === category);
        }

        if (search) {
            filtered = filtered.filter((el) =>
                el.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (price) {
            filtered = filtered.filter((el) => el.price <= price);
        }

        setData1(filtered);
    }

    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        apply();
    }, [category, search, price, allData]);

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

    return (
        <div className='dark:bg-[#1c1233] dark:text-[#fff] pb-[150px]'>
            <div className='bg-[#F1F5F8] dark:bg-[#1a1b46] dark:text-[#ccc] p-[5%] text-[#235275] text-[25px] font-[600]'>
                <h1><span>{t("home")}</span> / <span>{t("product")}</span></h1>
            </div>
            <div className='flex flex-col items-start md:flex-row w-[90%] m-auto'>
                <div className='w-[90%] mx-auto flex flex-col items-start justify-start py-[30px] gap-[10px]'>
                    <input
                        className='bg-[#F1F5F8] dark:bg-[#1a1b46] w-[90%] p-[10px]'
                        type="search"
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <p className='font-[600] text-[22px]'>Company</p>
                    <select
                        className='text-[22px] text-[#235275] dark:text-[#fff]'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option className='dark:text-[#000]' value="all">All</option>
                        <option className='dark:text-[#000]' value="ikea">Ikea</option>
                        <option className='dark:text-[#000]' value="marcos">Marcos</option>
                        <option className='dark:text-[#000]' value="caressa">Caressa</option>
                        <option className='dark:text-[#000]' value="liddy">Liddy</option>
                    </select>
                    <input
                        onInput={(e) => setPrice(e.target.value)}
                        max={500}
                        value={price}
                        className='w-[90%]'
                        type="range"
                    />
                    <p className='font-[100] text-[#235275] dark:text-[#fff]'>{t("value")} : ${price}</p>
                </div>
                <div className='w-[100%] md:w-[80%] flex flex-col items-center flex-wrap text-center mt-[30px] md:flex-row md:gap-y-[30px] justify-between'>
                    {
                        data1.map((el) => {
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

                                        <svg
                                            onClick={() => handleAddToCart(el)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-12 h-12 bg-green-500 text-white p-3 m-2 rounded-full"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>

                                    <h2 className="text-[16px] text-[gray] dark:text-[#fff]">{el.name}</h2>
                                    <h2 className="font-[700] text-[22px]">${el.price}</h2>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;
