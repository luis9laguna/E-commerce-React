import { Add, Remove } from "@material-ui/icons";
import styles from '@/styles/CartItems.module.css';
import { useCart } from "context/cart/cartContext";
import Link from "next/link";
import { useRouter } from "next/router";


export default function CartItems() {

    const { totalQuantityCart, items, addItem, removeItem } = useCart()

    const router = useRouter()

    const addQuantity = slug => {
        addItem({
            slug,
            quantity: 1,
            cart: true
        })
    }

    const removeQuantity = slug => {
        removeItem(slug)
    }

    const total = () => {

        const arrayTotalPriceItem = items.map(item => (
            item.price * item.quantity
        ))

        return arrayTotalPriceItem.reduce((a, b) => a + b, 0)
    }



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>YOUR BAG</h1>
            {items.length !== 0 ?
                <div className={styles.order}>
                    <div className={styles.info}>
                        <div className={styles.cart}>
                            <span>Cart (<b>{totalQuantityCart} products</b>)</span>
                        </div>
                        {items.map((product, i) => (

                            <div key={i} className={styles.product}>
                                <div className={styles.productDetail}>
                                    <img src={product.image} />
                                    <h2>{product.name}</h2>
                                </div>
                                <span className={styles.productPrice}>${product.price}</span>
                                <div className={styles.quantityContainer}>
                                    <button onClick={() => addQuantity(product.slug)}><Add /></button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => removeQuantity(product.slug)}> <Remove /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.summary}>
                        <h2>ORDER SUMMARY</h2>
                        <div>
                            <span>Subtotal</span>
                            <b>$ {total()}</b>
                        </div>
                        <div>
                            <span>Estimated Shipping</span>
                            <b>$ 15</b>
                        </div>
                        <div>
                            <span>Total</span>
                            <b>$ {total() + 15}</b>
                        </div>
                        <button className={styles.button} onClick={() => router.push('/checkout')}>CHECKOUT NOW</button>
                    </div>
                </div>

                :
                <h2 className={styles.nothing}>You don't have any product in your cart yet, go and check some <Link href="/product/all"><span>products!</span></Link></h2>
            }
        </div>
    )
}
