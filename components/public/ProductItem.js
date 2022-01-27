import styles from "@/styles/ProductItem.module.css";
import { Add, Remove } from "@material-ui/icons";

export default function ProductItem({ product }) {
    return (
        <div className={styles.container}>
            <div className={styles.ImgContainer}>
                <img className={styles.image} src={product.image} />
            </div>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.description}>
                    {product.description}
                </p>
                <span className={styles.price}>$ {product.price}</span>
                <div className={styles.addContainer}>
                    <div className={styles.amountContainer}>
                        <Remove />
                        <span className={styles.amount}>1</span>
                        <Add />
                    </div>
                    <button className={styles.button}>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}
