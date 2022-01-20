import { categories } from "../../../utils/data";
import ItemCategory from "./ItemCategory";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import useWindowDimensions from "hooks/use-window-dimensions";



const SliderCategory = () => {

    const { width } = useWindowDimensions();

    let slides = 3.3

    if (width < 800 && width > 600) {
        slides = 2.3
    } else if (width < 600) {
        slides = 1.3
    }

    return (

        <Swiper
            modules={[Navigation]}
            style={{ margin: "2rem 2rem" }}
            slidesPerView={slides}
            navigation
            loop={true}
            spaceBetween={50}
        >
            {categories.map(item => (
                <SwiperSlide key={item.id}>
                    <ItemCategory key={item.id} item={item} />
                </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default SliderCategory