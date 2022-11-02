import { useEffect, useState } from "react";
import useFetch from 'use-http'
import { useAuth } from "context/auth/authContext";
import { useCart } from "context/cart/cartContext";
import styles from '@/styles/ui/AllItemsProduct.module.scss'
import { MdOutlineFavoriteBorder, MdOutlineShoppingBasket } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { formatCurrency, formatImages } from 'utils/utils'
import Link from "next/link";

const AllItemsProduct = ({ product, setDeleteFav }) => {

    const [likeOrDislike, setLikeOrDislike] = useState(false);
    const [itemStock, setItemStock] = useState(0);
    const { ref, isLoggedIn } = useAuth()
    const { addItem } = useCart()

    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { post, response, loading } = useFetch(`${process.env.url}`, options)

    useEffect(() => {
        const hasLike = product.likes.includes(ref)
        setItemStock(product.stock)
        setLikeOrDislike(hasLike)
    }, [product, ref])

    const favButton = async (id) => {
        await post(`/like/${id}`)
        if (response.ok) {
            setLikeOrDislike(!likeOrDislike)

            if (!likeOrDislike) {
                toast.success('¡El producto ha sido agregado a tu lista de favoritos!')
            } else {
                toast.success('¡El producto ha sido eliminado a tu lista de favoritos!')
            }

            //IF WE WANNA DISLIKE IN THE WISHLIST PAGE
            if (setDeleteFav) setDeleteFav(true)
        } else {
            if (!isLoggedIn) {
                if (!isLoggedIn) document.querySelector('#login').click()
                toast.error('¡Ingrese en su cuenta para poder agregar a su lista de favoritos!')
            }
            else toast.error('¡Ha ocurrido un error, por favor intente luego!')
        }
    }

    const addCartHandler = () => {
        addItem({
            id: product._id,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.images[0]
        })
        setItemStock(prev => prev - 1)
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.imgContainer} ${itemStock === 0 ? styles.noStockImg : ''}`}>
                <Link href={`/product/${product.slug}`} passHref><img src={formatImages(product.images[0])} /></Link>
                {product.images.length > 1 && <Link href={`/product/${product.slug}`} passHref><img src={formatImages(product.images[1])} /></Link>}
                {itemStock === 0 && <div className={styles.noStock}>Agotado</div>}
            </div>
            <div className={styles.infoContainer}>
                <h2>{product.category[0].name}</h2>
                <Link href={`/product/${product.slug}`} passHref><h1>{product.name}</h1></Link>
                <div className={styles.priceContainer}>
                    {product.sale > 0 && <span className={styles.sale}>{formatCurrency(product.sale)} Oferta</span>}
                    <span className={`${styles.price} ${product.sale === 0 ? styles.onlyPrice : ''}`}>{formatCurrency(product.price)} Normal</span>
                </div>
            </div>
            <div className={styles.optionsContainer}>
                <button onClick={addCartHandler}>
                    Agregar <MdOutlineShoppingBasket className={styles.basket} />
                </button>
                <button
                    className={likeOrDislike ? styles.hasLike : ''}
                    onClick={() => favButton(product._id)}
                >
                    {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} /> : <MdOutlineFavoriteBorder className={styles.heart} />}
                </button>
            </div>

        </div >
    )
}

export default AllItemsProduct