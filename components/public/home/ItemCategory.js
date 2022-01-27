import Link from 'next/link';
import styles from '@/styles/home/ItemCategory.module.css'


const ItemCategory = ({ category }) => {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const title = titleCase(category.name);

    return (
        <Link href={`/category/${category.slug}`}>
            <div className={styles.container}>
                <img src={category.image} className={styles.image} />
                <h1 className={styles.title}>{title}</h1>
            </div>
        </Link>
    )
}

export default ItemCategory