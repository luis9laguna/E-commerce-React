import { Add, Remove } from "@material-ui/icons";
import styles from '@/styles/CartItems.module.css';


export default function CartItems() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>YOUR BAG</h2>
            <div className={styles.order}>
                <div className={styles.info}>
                    <div className={styles.products}>
                        <div className={styles.productDetail}>
                            <img className={styles.image} src="https://freepngimg.com/thumb/tshirt/36634-6-blank-white-t-shirt-template.png" />
                            <div className={styles.details}>
                                <h2> <b>Product:</b> Really Nice Shirt</h2>
                            </div>
                        </div>
                        <div className={styles.priceDetail}>
                            <div className={styles.productAmountContainer}>
                                <Add />
                                <span className={styles.productAmount}>2</span>
                                <Remove />
                            </div>
                            <span className={styles.productPrice}>$ 30</span>
                        </div>
                    </div>
                </div>
                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>ORDER SUMMARY</h2>
                    <div className={styles.summaryItem}>
                        <span>Subtotal</span>
                        <span>$ 80</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Estimated Shipping</span>
                        <span>$ 5.90</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Shipping Discount</span>
                        <span>$ -5.90</span>
                    </div>
                    <div className={styles.summaryItem} type="total">
                        <span>Total</span>
                        <span>$ 80</span>
                    </div>
                    <button className={styles.button}>CHECKOUT NOW</button>
                </div>
            </div>
        </div>
    )
}
