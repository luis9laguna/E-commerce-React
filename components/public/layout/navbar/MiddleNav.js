import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/layout/MiddleNav.module.css';
import { Badge } from '@material-ui/core';
import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons';


const MiddleNav = (props) => {

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>
                <Link href='/' >
                    SHOOP.
                </Link>
            </h1>
            <div className={styles.searchContainer}>
                <input className={styles.input} placeholder="Search" />
                <Search style={{ color: "black" }} />
            </div>
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
            </div>
            <input type="checkbox" onChange={() => props.open(!props.statusOpen)} className={styles.check} />
            <div className={styles.burguerContainer}>
                <div className={styles.burguer}>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default MiddleNav

