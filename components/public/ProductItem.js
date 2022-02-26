import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useCart } from 'context/cart/cartContext';
import styles from "@/styles/ProductItem.module.css";

const ProductItem = ({ product }) => {

    const { addItem } = useCart()

    const submitHandler = e => {
        e.preventDefault()
        const quantity = parseInt(e.target.amount.value)
        addItem({
            slug: product.slug,
            quantity,
            name: product.name,
            image: product.image,
            price: product.price
        })
    }


    return (
        <div className={styles.productContainer}>
            <div className={styles.ImgContainer}>
                <Zoom>
                    <img className={styles.image} src={product.image} />
                </Zoom>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.description}>
                        {product.description}
                    </p>
                    <span className={styles.price}>$ {product.price}</span>
                </div>
                {product.stock === 0 ? <div>No stock available</div>
                    : <div className={styles.addContainer}>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.amountContainer}>
                                <span>Amount</span>
                                <input
                                    className={styles.amount}
                                    id='amount'
                                    type='number'
                                    min='1'
                                    max='5'
                                    defaultValue='1' />
                            </div>
                            <button className={styles.button}>ADD TO CART</button>
                        </form>
                    </div>}
            </div>
        </div>
    )
}


export default ProductItem