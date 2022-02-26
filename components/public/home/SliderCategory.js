import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import useWindowDimensions from "hooks/useWindowDimensions";
import ItemCategory from "./ItemCategory";


const SliderCategory = ({ categories }) => {

    const [swiperSlider, setSwiperSlider] = useState(null)

    const { width } = useWindowDimensions();

    let slides = 3.3

    if (width < 800 && width > 600) slides = 2.3
    else if (width < 600) slides = 1.3



    useEffect(() => {
        const slide = categories.map((category) => {
            return (
                <SwiperSlide key={category._id}>
                    <ItemCategory category={category} />
                </SwiperSlide>
            )
        })

        setSwiperSlider(slide)
    }, [categories]);


    return (

        <>
            <Swiper
                modules={[Navigation]}
                style={{ margin: "2rem 2rem" }}
                slidesPerView={slides}
                navigation
                loop={true}
                spaceBetween={50}
            >
                {swiperSlider}
            </Swiper>
        </>
    )
}

export default SliderCategory