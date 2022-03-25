import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import ItemCategory from "./ItemCategory";


const SliderCategory = ({ categories }) => {

    const slides = categories.map((category) => {
        return (
            <SwiperSlide key={category._id}>
                <ItemCategory category={category} />
            </SwiperSlide>
        )
    })

    return (
        <Swiper
            modules={[Navigation]}
            style={{ margin: "2rem 2rem" }}
            slidesPerView={1.3}
            navigation
            loop={true}
            spaceBetween={50}
            breakpoints={{
                800: {
                    slidesPerView: 2.3,
                    spaceBetween: 50,
                },
                1900: {
                    slidesPerView: 3.3,
                    spaceBetween: 50,
                }
            }}
        >
            {slides}
        </Swiper>
    )
}

export default SliderCategory