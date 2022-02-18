import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'context/auth/authContext';
import HeaderAdmin from './HeaderAdmin';
import styles from './Sidebar.module.css'
import { ArchiveOutlined, DashboardOutlined, Menu, PersonOutlined, ShoppingCartOutlined } from '@material-ui/icons';

const Sidebar = ({ children }) => {

    const [openNav, setOpenNav] = useState(false);

    //CONTEXT
    const { userAuth, isLoggedIn, loadingUser, userName, role } = useAuth()

    //ROUTER
    const router = useRouter()

    //GET USER IF THERE IS A VALID TOKEN
    useEffect(() => {
        userAuth()
    }, [])

    useEffect(() => {
        if (!loadingUser && !isLoggedIn || role === 'USER_ROLE') {
            router.replace('/')
        }

    }, [isLoggedIn, loadingUser, role]);

    if (!isLoggedIn) return <div></div>

    //OPEN NAVBAR
    const handlerOpenNav = () => {
        setOpenNav(!openNav)
    }

    return (

        <div className={styles.AdminContainer}>
            <div className={`${styles.sidebar} ${openNav ? styles.open : ''} `}>
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
                                <span className={styles.linksName}>Users</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Users</span>
                    </li>
                    <li>
                        <Link href="/admin/orders">
                            <div className={router.pathname === '/admin/orders' ? styles.active : ''}>
                                <ShoppingCartOutlined className={styles.icon} />
                                <span className={styles.linksName}>Orders</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Orders</span>
                    </li>
                    <li>
                        <Link href="/admin/inventory">
                            <div className={router.pathname === '/admin/inventory' ? styles.active : ''}>
                                <ArchiveOutlined className={styles.icon} />
                                <span className={styles.linksName}>Inventory</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Inventory</span>
                    </li>
                </ul>
            </div>
            <div className={`${styles.children} ${openNav ? styles.childrenOpen : ''} `}>
                <HeaderAdmin setOpenNav={setOpenNav} openNav={openNav} />
                {children}
            </div>
        </div >
    )
};

export default Sidebar;
