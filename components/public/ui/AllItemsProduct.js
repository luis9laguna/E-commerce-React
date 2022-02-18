import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "context/auth/authContext";
import { useCart } from "context/cart/cartContext";
import { giveLikeAndDislike } from "helpers/api-util";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import styles from '@/styles/ui/AllItemsProduct.module.css'

const AllItemsProduct = ({ product, setDeleteFav }) => {

    const [likeOrDislike, setLikeOrDislike] = useState(null);
    const { ref } = useAuth()
    const { addItem } = useCart()
    const router = useRouter()

    //GET LIKES GIVEN BY USER TO SHOW FEEDBACK
    const hasLike = product.likes.includes(ref)

    useEffect(() => {
        setLikeOrDislike(hasLike)
    }, [hasLike]);

    //BUTTON FAV
    const favButton = async (slug) => {

        //SEND LIKE TO DB
        await giveLikeAndDislike(slug).then(resp => {
            if (!resp.ok) {
                //VALIDATION OF USER
                router.push('/login#login')
            }
        })

        //FEEDBACK USER
        setLikeOrDislike(!likeOrDislike)

        //IF WE WANNA DISLIKE IN THE WISHLIST PAGE
        if (setDeleteFav) setDeleteFav(true)
    }

    //HANDLER ADD CART
    const addCartHandler = () => {

        addItem({
            slug: product.slug,
            quantity: 1,
            name: product.name,
            image: product.image,
            price: product.price
        })
    }


    return (

        <div className={styles.container}>
            {product.stock === 0 ? <div className={styles.noStock}>Sold Out</div> : ''}
            <img className={`${styles.image} ${product.stock === 0 ? styles.noStockImg : ''}`} src='https://d2r9epyceweg5n.cloudfront.net/stores/001/064/802/products/dscn5121-011-63ea8aaaee2ca1bbaa16114183468496-640-0.jpeg' />
            <div className={styles.info}>
                <h1 className={styles.title}>{product.name}</h1>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.allIcons}>

                    {product.stock !== 0 ? (
                        <button className={styles.buttonOptions} onClick={addCartHandler}>
                            <ShoppingBasketOutlined style={{ margin: 'auto' }} />
                        </button>
                    )
                        : ''}

                    <Link href={`/product/${product.slug}`}>
                        <button className={styles.buttonOptions}>
                            <SearchOutlined style={{ margin: 'auto' }} />
                        </button>
                    </Link>
                    <button
                        className={`${styles.buttonOptions} ${likeOrDislike ? styles.hasLike : ''} `}
                        onClick={() => favButton(product.slug)}
                    >
                        <FavoriteBorderOutlined style={{ margin: 'auto' }} />
                    </button>
                </div>
                {product.stock !== 0 ? <button onClick={addCartHandler}>ADD TO CART</button> : ''}
                <button
                    className={`${styles.fav} ${likeOrDislike ? styles.hasLike : ''} `}
                    onClick={() => favButton(product.slug)}
                >
                    <FavoriteBorderOutlined style={{ margin: 'auto' }} />
                </button>
            </div>
        </div >
    )
}

export default AllItemsProduct