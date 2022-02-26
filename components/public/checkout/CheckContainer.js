import styles from '@/styles/CheckContainer.module.css'
import { useAuth } from 'context/auth/authContext'
import { useCart } from 'context/cart/cartContext'


const CheckContainer = ({ children, userHasAddress }) => {

    const { items } = useCart()
    const { isLoggedIn } = useAuth()


    const goToPay = () => {
        console.log('paying...')
    }

    const total = () => {
        const arrayTotalPriceItem = items.map(item => (
            item.price * item.quantity
        ))
        return arrayTotalPriceItem.reduce((a, b) => a + b, 0)
    }

    return (
        <div className={styles.container}>

            {isLoggedIn ?
                <h1>Please select an address</h1> :
                <h1>Please create an address</h1>
            }
            <div>
                <div className={styles.addresses}>
                    {children}
                </div>
                <div className={styles.summary}>
                    <h2>ORDER SUMMARY</h2>
                    <div className={styles.containerDetailProduct}>
                        {items.map((item, i) => (
                            <div key={i} className={styles.productDetail}>
                                <div>
                                    <img src={item.image} />
                                    <div>
                                        <b>{item.name}</b>
                                        <span>{item.quantity} un.</span>
                                    </div>
                                </div>
                                <span>${item.price}</span>
                            </div>
                        ))}
                    </div>
                    <hr />


                    <div>
                        <span>Estimated Shipping</span>
                        <b>$ 15</b>
                    </div>
                    <div>
                        <span>Total</span>
                        <b>$ {total() + 15}</b>
                    </div>
                    <button disabled={!userHasAddress} className={styles.button} onClick={goToPay}>CHECKOUT NOW</button>
                </div>
            </div>
        </div>
    )
}

export default CheckContainer