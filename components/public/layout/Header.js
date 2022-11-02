import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdOutlineAccountCircle, MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdSearch } from 'react-icons/md';
import SideBar from './SideBar';
import ContainerAuth from '../auth/ContainerAuth';
import styles from '@/styles/layout/Header.module.scss';
import { useCart } from 'context/cart/cartContext';
import { useAuth } from 'context/auth/authContext';
import { useCategory } from 'context/category/categoryContext';
import Modal from "@/components/public/ui/Modal"

const Header = () => {

    //STATES TO SHOW
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [sideOpen, setSideOpen] = useState(false);
    const [userOpen, setUseOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [authForm, setAuthForm] = useState(null)

    //CONTEXT
    const { totalQuantityCart } = useCart()
    const { isLoggedIn, logOut, userName } = useAuth()
    const { categories } = useCategory()
    const router = useRouter();

    // HANDLE SEARCH FORM
    const searchForm = (e) => {
        e.preventDefault();
        const value = e.target.search.value;
        if (value.length < 3) return
        router.push({
            pathname: '/search',
            query: { q: value }
        })
    }


    return (
        <>
            <div className={styles.header}>
                <span className={styles.announcement}>
                    ATENCION!!! Envio gratis en ordenes sobre $30.000!
                </span>
                <div className={styles.containerMiddle}>
                    <div className={styles.cBurguerLogo}>
                        <button className={`${styles.burguer} ${sideOpen ? styles.open : ''}`} onClick={() => setSideOpen(prev => !prev)}>
                            <div />
                        </button>
                        <h1 className={styles.logo}>
                            <Link href='/'>SHOOP.</Link>
                        </h1>
                    </div>
                    <form className={styles.searchContainer} onSubmit={searchForm}>
                        <input name="search" defaultValue='' placeholder="Buscar" />
                        <button type='submit'><MdSearch /></button>
                    </form>
                    <div className={styles.containerOptions}>
                        {isLoggedIn &&
                            <Link href='/wishList' passHref>
                                <a><MdOutlineFavoriteBorder /></a>
                            </Link>
                        }
                        <Link href='/cart' passHref>
                            <a className={styles.cart}>
                                {totalQuantityCart !== 0 && <span>{totalQuantityCart}</span>}
                                <MdOutlineShoppingCart />
                            </a>
                        </Link>
                        <button className={`${styles.accountCircle} ${userOpen ? styles.open : ''}`} onClick={() => setUseOpen(prev => !prev)}>
                            {isLoggedIn ? <span>{userName}</span> : <MdOutlineAccountCircle />}
                            <ul>
                                {isLoggedIn ?
                                    <>
                                        <li><a onClick={() => router.push('/user')}>Mi perfil</a></li>
                                        <li><a onClick={() => logOut()}>Salir</a></li>
                                    </> :
                                    <>
                                        <li><a id="login" onClick={() => setAuthForm('login')}>Ingresar</a></li>
                                        <li><a onClick={() => setAuthForm('register')}>Registrar</a></li>
                                    </>}
                            </ul>
                        </button>
                    </div>
                </div>
                <div className={styles.containerDown} >
                    <div className={styles.home}><Link href='/'>Inicio</Link></div >
                    <div className={`${styles.category} ${openCategories ? styles.open : ''}`} onClick={() => setOpenCategories(prev => !prev)}>
                        <a href='#'>Categorias</a>
                        <ul>
                            {categories?.map(category => (
                                <li key={category._id}>
                                    <Link href={`/category/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div><Link href='/product/all'>Productos</Link></div>
                    <div><a href='#' onClick={() => setShowAboutUs(prev => !prev)}>Acerca</a></div>
                </div >
                <SideBar categories={categories} sideOpen={sideOpen} setSideOpen={setSideOpen} />
            </div>
            {showAboutUs &&
                <Modal onClose={() => setShowAboutUs(prev => !prev)}>
                    <div className={styles.about}>
                        <h1>OUR MISSION</h1>
                        <p >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alinonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure doloqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </div>
                </Modal>}

            {authForm && <ContainerAuth authForm={authForm} setAuthForm={setAuthForm} />}

        </>
    )
}

export default Header