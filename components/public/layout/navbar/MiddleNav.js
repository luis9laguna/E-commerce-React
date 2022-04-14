import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from 'context/cart/cartContext';
import styles from '@/styles/layout/MiddleNav.module.css';
import { Badge } from '@material-ui/core';
import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';


const MiddleNav = ({ setIsOpen, isOpen }) => {

    const [search, setSearch] = useState('');

    //GET QUERY IF THERE IS
    const router = useRouter();
    const querySearch = router.query?.q


    useEffect(() => {
        querySearch && setSearch(querySearch)
    }, [])

    //CONTEXT
    const { totalQuantityCart } = useCart()

    // HANDLE SEARCH FORM
    const searchForm = (e) => {
        e.preventDefault();

        if (search === '' || search.length < 3) return
        router.push({
            pathname: '/search',
            query: { q: search }
        })
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>
                <Link href='/'>SHOOP.</Link>
            </h1>
            <form className={styles.searchContainer} onSubmit={searchForm}>
                <input value={search} className={styles.input} placeholder="Buscar" onChange={e => setSearch(e.target.value)} />
                <button type='submit'><Search style={{ color: "black" }} /></button>
            </form>
            <div className={styles.cartFavContainer}>
                <div>
                    <Link href='/wishList'>
                        <FavoriteBorderOutlined />
                    </Link>
                </div>
                <div>
                    <Badge style={{ zIndex: "0" }} badgeContent={totalQuantityCart} color="secondary">
                        <Link href='/cart'>
                            <ShoppingCartOutlined />
                        </Link>
                    </Badge>
                </div>
                <button className={`${styles.burguer} ${isOpen ? styles.open : ''}`} onClick={setIsOpen}>
                    <div />
                </button>
            </div>
        </div>
    )
}

export default MiddleNav

