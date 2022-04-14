import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from 'use-http'
import { useAuth } from "context/auth/authContext";
import { useCart } from "context/cart/cartContext";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import styles from '@/styles/ui/AllItemsProduct.module.css'
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const AllItemsProduct = ({ product, setDeleteFav }) => {

    const [likeOrDislike, setLikeOrDislike] = useState(null);
    const [itemStock, setItemStock] = useState(0);
    const { ref, isLoggedIn } = useAuth()
    const { addItem } = useCart()
    const router = useRouter()

    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let options
    if (storage) {
        options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    }
    const { post, response, loading, error } = useFetch(`${process.env.url}`, options)

    //GET LIKES GIVEN BY USER TO SHOW FEEDBACK
    const hasLike = product.likes?.includes(ref)

    useEffect(() => { setLikeOrDislike(hasLike) }, [hasLike]);
    useEffect(() => { setItemStock(product.stock) }, [])

    //BUTTON FAV
    const favButton = async (id) => {
        //SEND LIKE TO DB
        if (!isLoggedIn) router.push('/login#login')
        //SEND
        await post(`/like/${id}`)
        if (response.ok) {
            //FEEDBACK USER
            setLikeOrDislike(!likeOrDislike)

            //IF WE WANNA DISLIKE IN THE WISHLIST PAGE
            if (setDeleteFav) setDeleteFav(true)
        }
    }

    //HANDLER ADD CART
    const addCartHandler = () => {
        addItem({
            id: product._id,
            slug: product.slug,
            quantity: 1,
            name: product.name,
            image: product.images[0],
            price: product.price
        })
        setItemStock(prev => prev - 1)
    }

    const transform = 'c_scale,w_350'
    const imageArray = product.images[0].split('/')
    imageArray.splice(6, 0, transform)
    const transformImage = imageArray.join('/')

    return (
        <div className={styles.container}>
            {itemStock === 0 && <div className={styles.noStock}>Agotado</div>}
            <Link href={`/product/${product.slug}`}>
                <img className={`${styles.image} ${itemStock === 0 ? styles.noStockImg : ''}`} src={transformImage} />
            </Link>
            <div className={styles.info}>
                <h1 className={styles.title}>{product.name}</h1>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.allIcons}>

                    {itemStock !== 0 &&
                        <button className={styles.buttonOptions} onClick={addCartHandler}>
                            <ShoppingBasketOutlined style={{ margin: 'auto' }} />
                        </button>
                    }
                    <Link href={`/product/${product.slug}`}>
                        <button className={styles.buttonOptions}>
                            <SearchOutlined style={{ margin: 'auto' }} />
                        </button>
                    </Link>
                    <button
                        className={`${styles.buttonOptions} ${likeOrDislike ? styles.hasLike : ''} `}
                        onClick={() => favButton(product._id)}
                    >
                        {loading ? <Loading light={true} /> : <FavoriteBorderOutlined style={{ margin: 'auto' }} />}
                    </button>
                </div>
                {itemStock !== 0 && <button onClick={addCartHandler}>AGREGAR AL CARRITO</button>}
                <button
                    className={`${styles.fav} ${likeOrDislike ? styles.hasLike : ''} `}
                    onClick={() => favButton(product.slug)}
                >
                    {loading ? <Loading light={true} /> : <FavoriteBorderOutlined style={{ margin: 'auto' }} />}
                </button>
                {error && <ErrorMessage />}
            </div>
        </div >
    )
}

export default AllItemsProduct