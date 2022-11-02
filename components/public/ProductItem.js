import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useCart } from 'context/cart/cartContext';
import styles from "@/styles/pages/ProductItem.module.scss";
import { formatCurrency, formatImages } from 'utils/utils'


const ProductItem = ({ product }) => {

    const { addItem } = useCart()

    const submitHandler = e => {
        e.preventDefault()
        const quantity = parseInt(e.target.amount.value)
        addItem({
            id: product._id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            quantity
        })
    }

    const formatImages = (image) => {
        const imageArray = image.split('/')
        imageArray.splice(6, 0, 'c_scale,w_350')
        return imageArray.join('/')
    }

    return (
        <div className={styles.productContainer}>
            <div >
                <Zoom>
                    <img src={formatImages(product.images[0])} />
                </Zoom>
            </div>
            <div className={styles.infoContainer}>
                <div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <span>{formatCurrency(product.price)}</span>
                </div>
                {product.stock === 0 ? <div>No hay stock disponible</div>
                    : <div className={styles.addContainer}>
                        <form onSubmit={submitHandler}>
                            <div>
                                <span>Cantidad</span>
                                <input
                                    id='amount'
                                    type='number'
                                    min='1'
                                    max='5'
                                    defaultValue='1' />
                            </div>
                            <button>Agregar</button>
                        </form>
                    </div>}
            </div>
        </div>
    )
}


export default ProductItem