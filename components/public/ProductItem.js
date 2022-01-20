import styles from "@/styles/ProductItem.module.css";
import { Add, Remove } from "@material-ui/icons";

export default function ProductItem() {
    return (
        <div className={styles.container}>
            <div className={styles.ImgContainer}>
                <img className={styles.image} src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" />
            </div>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>Denim Jumpsuit</h1>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <span className={styles.price}>$ 20</span>
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
