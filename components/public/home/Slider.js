import styled from "styled-components";
import { sliderItems } from "../../../utils/data";
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';

const Image = styled.img`
width: 100%;
`


const Slider = () => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
        >
            {sliderItems.map((item) => (
                <SwiperSlide key={item.id}>
                    <Image loading="lazy" src={item.img} />
                </SwiperSlide>
            ))}
        </Swiper>



    )
}

export default Slider