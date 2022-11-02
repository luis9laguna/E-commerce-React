import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import styles from '@/styles/pages/home/ItemCategory.module.scss'


const SliderCategory = ({ categories }) => {

    const formatImages = (image) => {
        const imageArray = image.split('/')
        imageArray.splice(6, 0, 'c_scale,w_350')
        return imageArray.join('/')
    }

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
            {categories.map((category) => (
                <SwiperSlide key={category._id}>
                    <div className={styles.container}>
                        <img src={formatImages(category.image)} />
                        <Link href={`/category/${category.slug}`} passHref>
                            <h1>{category.name}</h1>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SliderCategory