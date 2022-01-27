import Link from "next/link";
import styles from '@/styles/ui/AllItemsProduct.module.css'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import { useEffect } from "react";

const AllItemsProduct = ({ product }) => {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const title = titleCase(product.name);

    return (

        <div className={styles.container}>
            <div className={styles.circle} />
            <img className={styles.image} src={product.image} />
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.allIcons}>
                    <span>
                        <ShoppingBasketOutlined style={{ margin: 'auto' }} />
                    </span>
                    <Link href={`/product/${product.slug}`}>
                        <span>
                            <SearchOutlined style={{ margin: 'auto' }} />
                        </span>
                    </Link>
                    <span>
                        <FavoriteBorderOutlined style={{ margin: 'auto' }} />
                    </span>
                </div>
                <button>ADD TO CART</button>
            </div>
        </div>
    )
}

export default AllItemsProduct