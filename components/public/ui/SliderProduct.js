import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import AllItemsProduct from '@/components/public/ui/AllItemsProduct'
import { Favorite, NewReleases } from "@material-ui/icons";
import useWindowDimensions from "hooks/useWindowDimensions";

const SliderProduct = ({ products, description, icon }) => {

    //WIDTH OF SCREEN
    const { width } = useWindowDimensions();
    let slides = 5.3

    if (width < 1890 && width > 1520) slides = 4.3
    else if (width < 1521 && width > 970) slides = 3.3
    else if (width < 971 && width > 670) slides = 2.3
    else if (width < 671) slides = 1.3

    const information = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        fontSize: '2rem',
        color: '#303030',
        margin: '2.5rem 0'
    }

    let svgIcon = ''
    if (icon === 'favs') svgIcon = <Favorite />
    else if (icon === 'news') svgIcon = <NewReleases />

    return (
        <>
            <span style={information}>
                {svgIcon}{description}{svgIcon}
            </span>
            <Swiper
                modules={[Navigation]}
                slidesPerView={slides}
                navigation
                loop={true}
                spaceBetween={30}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <AllItemsProduct product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default SliderProduct