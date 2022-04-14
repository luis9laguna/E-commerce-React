import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import styles from '@/styles/CartItems.module.css';
import { useCart } from "context/cart/cartContext";
import Link from "next/link";
import { useRouter } from "next/router";


const CartItems = () => {

    const { totalQuantityCart, items, addItem, removeItem, subtractItem } = useCart()

    const router = useRouter()

    const addQuantity = id => {
        addItem({
            id,
            quantity: 1,
            cart: true
        })
    }
    console.log(items)

    const subtractQuantity = id => subtractItem(id)

    const deleteItem = id => removeItem(id)

    const total = () => {
        const arrayTotalPriceItem = items.map(item => (
            item.price * item.quantity
        ))
        return arrayTotalPriceItem.reduce((a, b) => a + b, 0)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TU BOLSA</h1>
            {items.length !== 0 ?
                <div className={styles.order}>
                    <div className={styles.info}>
                        <div className={styles.cart}>
                            <span>Carro (<b>{totalQuantityCart} Productos</b>)</span>
                        </div>
                        {items.map((product, i) => (
                            <div key={i} className={styles.product}>
                                <div className={styles.productDetail}>
                                    <img src={product.image} />
                                    <h2>{product.name}</h2>
                                </div>
                                <span className={styles.productPrice}>${product.price}</span>
                                <div className={styles.lastContainer}>
                                    <div className={styles.quantityContainer}>
                                        <button onClick={() => addQuantity(product.id)}><Add /></button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => subtractQuantity(product.id)}> <Remove /></button>
                                    </div>
                                    <span className={styles.delete} onClick={() => deleteItem(product.id)}><DeleteOutline />Eliminar producto</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.summary}>
                        <h2>RESUMEN DE LA ORDEN</h2>
                        <hr />
                        <div>
                            <span>Subtotal</span>
                            <b>$ {total()}</b>
                        </div>
                        <div>
                            <span>Envio estimado</span>
                            <b>$ 15</b>
                        </div>
                        <div>
                            <span>Total</span>
                            <b>$ {total() + 15}</b>
                        </div>
                        <button className={styles.button} onClick={() => router.push('/checkout')}>Continuar</button>
                    </div>
                </div>
                :
                <h2 className={styles.nothing}>¡No tienes productos en tu carro aun, ve y mira algunos <Link href="/product/all"><span>productos!</span></Link></h2>
            }
        </div>
    )
}


export default CartItems
