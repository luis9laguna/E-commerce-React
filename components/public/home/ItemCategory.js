import Link from 'next/link';
import styles from '@/styles/home/ItemCategory.module.css'


const ItemCategory = ({ category }) => {

    return (
        <Link href={`/category/${category.slug}`}>
            <div className={styles.container}>
                <img src={category.image} className={styles.image} />
                <h1 className={styles.title}>{category.name}</h1>
            </div>
        </Link>
    )
}

export default ItemCategory