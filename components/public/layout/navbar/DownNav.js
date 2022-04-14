import Link from "next/link";
import { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { ArrowDropDown } from '@material-ui/icons';
import styles from '@/styles/layout/DownNav.module.css';
import SignLog from '@/components/public/ui/SignLog';
import Loading from "../../ui/Loading";
import ErrorMessage from "../../ui/ErrorMessage";

const DownNav = ({ statusOpen, showContactForm, showAboutUs }) => {

    const [categories, setCategories] = useState([]);
    const [dropCategory, setDropCategory] = useState(false);

    //USEFETCH
    const { get, response, loading, error } = useFetch(`${process.env.url}`)

    useEffect(async () => {
        const data = await get('category')
        if (response.ok) setCategories(data.categories)
    }, [])

    return (
        <div className={`${styles.containerNavDown} ${statusOpen ? styles.show : ''}`} >
            <div className={styles.home}><Link href='/'>Inicio</Link></div >
            <div className={`${styles.category} ${dropCategory ? styles.dropActive : ''}`} onClick={() => setDropCategory(!dropCategory)}>
                <div className={styles.cateArrow}>Categorias<ArrowDropDown /></div>
                <div className={styles.dropDown}>
                    {error && <ErrorMessage />}
                    {loading ? <Loading light={true} /> :
                        <ul>
                            {categories.map(category => (
                                <li key={category._id}>
                                    <Link href={`/category/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
            <div><Link href='/product/all'>Productos</Link></div>
            <div><a href='#' onClick={showAboutUs}>Acerca</a></div>
            <div><a href='#' onClick={showContactForm}>Contacto</a></div>
            {statusOpen && <SignLog />}
        </div >
    )
}

export default DownNav

