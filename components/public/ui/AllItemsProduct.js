import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import styles from '@/styles/ui/AllItemsProduct.module.css'

const AllItemsProduct = ({ item }) => {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const title = titleCase(item.title);

    return (
        <div className={styles.container}>
            <div className={styles.circle} />
            <img className={styles.image} src={item.img} />
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.price}>${item.price}</span>
                <div className={styles.allIcons}>
                    <span>
                        <ShoppingBasketOutlined style={{ margin: 'auto' }} />
                    </span>
                    <span>
                        <SearchOutlined style={{ margin: 'auto' }} />
                    </span>
                    <span>
                        <FavoriteBorderOutlined style={{ margin: 'auto' }} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AllItemsProduct