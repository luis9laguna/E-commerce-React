import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import AllItemsProduct from '@/components/public/ui/AllItemsProduct'
import { Favorite, NewReleases } from "@material-ui/icons";
import useWindowDimensions from "hooks/useWindowDimensions";
import { popularProducts1, popularProducts2 } from "../../../utils/data";

const SliderProduct = ({ newestProducts }) => {

    //SWIPER
    const [slideNewest, setSlideNewest] = useState(null)

    useEffect(() => {
        const slide = newestProducts.map((product) => {
            return (
                <SwiperSlide key={product._id}>
                    <AllItemsProduct product={product} />
                </SwiperSlide>
            )
        })
        setSlideNewest(slide)
    }, [newestProducts]);


    //WIDTH OF SCREEN
    const { width } = useWindowDimensions();
    let slides = 5.3

    if (width < 1440 && width > 800) {
        slides = 3.3
    } else if (width < 800 && width > 600) {
        slides = 2.3
    } else if (width < 600) {
        slides = 1.3
    }

    const information = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        fontSize: '2rem',
        color: '#303030',
        margin: '2.5rem 0'
    }


    return (
        <>
            {/* <span style={information}>
                <Favorite />Check The Favorite Products of our users<Favorite />
            </span>

            <Swiper
                modules={[Navigation]}
                slidesPerView={slides}
                navigation
                loop={true}
                spaceBetween={50}
            >

                {popularProducts1.map(item => (
                    <SwiperSlide key={item.id}>
                        <AllItemsProduct key={item.id} product={item} />
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <>
                <span style={information}>
                    <NewReleases />Take a look to our new Products<NewReleases />
                </span>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={slides}
                    navigation
                    loop={true}
                    spaceBetween={50}
                >
                    {slideNewest}
                </Swiper>
            </>
        </>
    )
}

export default SliderProduct