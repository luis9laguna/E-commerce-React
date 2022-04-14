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
            id: product._id,
            slug: product.slug,
            quantity,
            name: product.name,
            image: product.images[0],
            price: product.price
        })
    }
    const transform = 'c_scale,w_900'
    const imageArray = product.images[0].split('/')
    imageArray.splice(6, 0, transform)
    const transformImage = imageArray.join('/')


    return (
        <div className={styles.productContainer}>
            <div className={styles.imgContainer}>
                <Zoom>
                    <img className={styles.image} src={transformImage} />
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
                {product.stock === 0 ? <div>No hay stock disponible</div>
                    : <div className={styles.addContainer}>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.amountContainer}>
                                <span>Cantidad</span>
                                <input
                                    className={styles.amount}
                                    id='amount'
                                    type='number'
                                    min='1'
                                    max='5'
                                    defaultValue='1' />
                            </div>
                            <button className={styles.button}>AGREGAR AL CARRITO</button>
                        </form>
                    </div>}
            </div>
        </div>
    )
}


export default ProductItem