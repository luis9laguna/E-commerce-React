import { ArrowDropDown } from '@material-ui/icons';
import styles from '@/styles/layout/DownNav.module.css';
import Link from "next/link";
import SignLog from '@/components/public/ui/SignLog';
import { useEffect, useState } from 'react';
import { getAllCategories } from 'helpers/api-util';

const DownNav = ({ statusOpen, showContactForm, showAboutUs }) => {

    const [categories, setCategories] = useState(null);
    const [dropCategory, setDropCategory] = useState(false);

    useEffect(async () => {
        const data = await getAllCategories()
        setCategories(data)
    }, [])

    let navCategories

    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    if (categories !== null) {
        navCategories = categories?.map((category) => {

            const title = titleCase(category.name);
            return (
                <li key={category._id}>
                    <Link href={`/category/${category.slug}`}>
                        {title}
                    </Link>
                </li>
            )
        })
    }

    return (
        <div className={`${styles.containerNavDown} ${statusOpen ? styles.show : ''}`} >
            <div className={styles.home}><Link href='/'>Home</Link></div >
            <div className={`${styles.category} ${dropCategory ? styles.dropActive : ''}`} onClick={() => setDropCategory(!dropCategory)}>
                <div className={styles.cateArrow}> Categories<ArrowDropDown /></div>
                <div className={styles.dropDown}>
                    <ul>
                        {navCategories}
                    </ul>
                </div>
            </div>
            <div><Link href='/product/all'>All Products</Link></div>
            <div><a href='#' onClick={showAboutUs}>About us</a></div>
            <div><a href='#' onClick={showContactForm}>Contact us</a></div>
            {statusOpen && <SignLog />}
        </div >
    )
}

export default DownNav

