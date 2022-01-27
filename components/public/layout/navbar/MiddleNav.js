import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/layout/MiddleNav.module.css';
import { Badge } from '@material-ui/core';
import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';


const MiddleNav = (props) => {

    const [search, setSearch] = useState('');

    const router = useRouter();

    const searchForm = (e) => {
        e.preventDefault();

        if (search === '' || search.length < 3) {
            return
        }
        router.push({
            pathname: '/search',
            query: { q: search }
        })
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>
                <Link href='/' >
                    SHOOP.
                </Link>
            </h1>
            <form className={styles.searchContainer} onSubmit={searchForm}>
                <input className={styles.input} placeholder="Search" onChange={e => setSearch(e.target.value)} />
                <button type='submit'><Search style={{ color: "black" }} /></button>
            </form>
            <div className={styles.cartFavContainer}>
                <div>
                    <Link href='/wishList'>
                        <FavoriteBorderOutlined />
                    </Link>
                </div>
                <div>
                    <Badge style={{ zIndex: "0" }} badgeContent={4} color="secondary">
                        <Link href='/cart'>
                            <ShoppingCartOutlined />
                        </Link>
                    </Badge>
                </div>
                <input type="checkbox" onChange={() => props.open(!props.statusOpen)} className={styles.check} />
                <div className={styles.burguerContainer}>
                    <div className={styles.burguer}>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiddleNav

