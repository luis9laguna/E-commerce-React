import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'context/auth/authContext';
import HeaderAdmin from './HeaderAdmin';
import styles from './Sidebar.module.css'
import { ArchiveOutlined, DashboardOutlined, Menu, PersonOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import { SyncLoader } from 'react-spinners';

const Sidebar = ({ children }) => {

    const [openNav, setOpenNav] = useState(false);

    //ROUTER
    const router = useRouter()

    //CONTEXT
    const { isLoading, isLoggedIn, role } = useAuth()

    const style = {
        width: '100&',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    if (isLoading) return (
        <div style={style}>
            <SyncLoader color={'#303030'} loading={isLoading} size={100} />
        </div>
    )

    if (!isLoading && isLoggedIn && role === 'USER_ROLE') router.push('/')

    //OPEN NAVBAR
    const handlerOpenNav = () => { setOpenNav(!openNav) }

    return (

        <div className={styles.AdminContainer}>
            <div className={`${styles.sidebar} ${openNav && styles.open} `}>
                <div className={styles.logoDetails}>
                    <div className={styles.logoName}>E-Commerce</div>
                    <Menu className={`${styles.icon} ${styles.burguer}`} onClick={handlerOpenNav} />
                </div>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/admin/dashboard">
                            <div className={router.pathname === '/admin/dashboard' ? styles.active : ''}>
                                <DashboardOutlined className={styles.icon} />
                                <span className={styles.linksName}>Dashboard</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Dashboard</span>
                    </li>
                    <li>
                        <Link href="/admin/users">
                            <div className={router.pathname === '/admin/users' ? styles.active : ''}>
                                <PersonOutlined className={styles.icon} />
                                <span className={styles.linksName}>Usuarios</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Usuarios</span>
                    </li>
                    <li>
                        <Link href="/admin/orders">
                            <div className={router.pathname === '/admin/orders' ? styles.active : ''}>
                                <ShoppingCartOutlined className={styles.icon} />
                                <span className={styles.linksName}>Ordenes</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Ordenes</span>
                    </li>
                    <li>
                        <Link href="/admin/inventory" passHref>
                            <div className={router.pathname === '/admin/inventory' ? styles.active : ''}>
                                <ArchiveOutlined className={styles.icon} />
                                <span className={styles.linksName}>Inventario</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Inventario</span>
                    </li>
                </ul>
            </div>
            <div className={`${styles.children} ${openNav && styles.childrenOpen} `}>
                <HeaderAdmin setOpenNav={setOpenNav} openNav={openNav} />
                {children}
            </div>
        </div >
    )
};

export default Sidebar;
