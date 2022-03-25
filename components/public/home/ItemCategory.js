import Link from 'next/link';
import styles from '@/styles/home/ItemCategory.module.css'


const ItemCategory = ({ category }) => {

    const transform = 'c_scale,w_350'
    const imageArray = category.image.split('/')
    imageArray.splice(6, 0, transform)
    const transformImage = imageArray.join('/')

    return (
        <Link href={`/category/${category.slug}`}>
            <div className={styles.container}>
                <img src={transformImage} className={styles.image} />
                <h1 className={styles.title}>{category.name}</h1>
            </div>
        </Link>
    )
}

export default ItemCategory