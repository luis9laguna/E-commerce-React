import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import AllItemsProduct from '@/components/public/ui/products/AllItemsProduct'
import { Favorite, NewReleases } from "@material-ui/icons";

const SliderProduct = ({ products, description, icon }) => {

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
                slidesPerView={1.3}
                spaceBetween={10}
                modules={[Navigation]}
                navigation
                loop={true}
                breakpoints={{
                    750: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    900: {
                        slidesPerView: 2.3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3.3,
                        spaceBetween: 40,
                    },
                    1550: {
                        slidesPerView: 4.3,
                        spaceBetween: 50,
                    }
                }}
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