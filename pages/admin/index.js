import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/auth/authContext';
import styles from '@/styles/layout/AdminLayout.module.scss';
import { SyncLoader } from 'react-spinners';
import { MdExitToApp, MdMenu, MdOutlineAdminPanelSettings, MdOutlineArchive, MdOutlineCategory, MdOutlineDashboard, MdOutlineMenu, MdOutlineShoppingCart, MdPersonOutline } from 'react-icons/md';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ContainerDashboard from '@/components/admin/dashboard/ContainerDashboard';
import ContainerUsers from '@/components/admin/users/ContainerUsers';
import ContainerOrders from '@/components/public/ui/orders/ContainerOrders';
import ContainerProducts from '@/components/admin/product/ContainerProducts';
import ContainerCategories from '@/components/admin/category/ContainerCategories';


const Admin = () => {

    const [page, setPage] = useState('dashboard');
    const [openNav, setOpenNav] = useState(false);

    const { isLoading, isLoggedIn, role, logOut, userName } = useAuth()

    const router = useRouter()

    if (isLoading) return (
        <div className={styles.spinner}>
            <SyncLoader color={'#303030'} loading={isLoading} size={50} />
        </div>
    )
    if (!isLoggedIn || role === 'USER_ROLE') {
        router.replace('/404')
        return <div></div>
    }

    const loggingOut = () => {
        router.replace('/')
        logOut()
    }

    return (
        <div className={styles.AdminContainer}>
            <div className={`${styles.sidebar} ${openNav ? styles.open : ''} `}>
                <div className={styles.logoDetails}>
                    <h3 >E-Commerce</h3>
                    <MdOutlineMenu className={styles.burguer} onClick={() => { setOpenNav(!openNav) }} />
                </div>
                <ul>
                    <li>
                        <button className={page === 'dashboard' ? styles.active : ''} onClick={() => setPage('dashboard')}>
                            <MdOutlineDashboard />
                            <span className={styles.linksName}>Dashboard</span>
                        </button>
                        <span className={styles.tooltip}>Dashboard</span>
                    </li>
                    <li>
                        <button className={page === 'admins' ? styles.active : ''} onClick={() => setPage('admins')}>
                            <MdOutlineAdminPanelSettings className={styles.icon} />
                            <span className={styles.linksName}>Admins</span>
                        </button>
                        <span className={styles.tooltip}>Admins</span>
                    </li>
                    <li>
                        <button className={page === 'users' ? styles.active : ''} onClick={() => setPage('users')}>
                            <MdPersonOutline className={styles.icon} />
                            <span className={styles.linksName}>Usuarios</span>
                        </button>
                        <span className={styles.tooltip}>Usuarios</span>
                    </li>
                    <li>
                        <button className={page === 'orders' ? styles.active : ''} onClick={() => setPage('orders')}>
                            <MdOutlineShoppingCart className={styles.icon} />
                            <span className={styles.linksName}>Ordenes</span>
                        </button>
                        <span className={styles.tooltip}>Ordenes</span>
                    </li>
                    <li>
                        <button className={page === 'category' ? styles.active : ''} onClick={() => setPage('category')}>
                            <MdOutlineCategory className={styles.icon} />
                            <span className={styles.linksName}>Category</span>
                        </button>
                        <span className={styles.tooltip}>Category</span>
                    </li>
                    <li>
                        <button className={page === 'products' ? styles.active : ''} onClick={() => setPage('products')}>
                            <MdOutlineArchive className={styles.icon} />
                            <span className={styles.linksName}>Products</span>
                        </button>
                        <span className={styles.tooltip}>Products</span>
                    </li>
                </ul>
            </div>
            <div className={`${styles.children} ${openNav ? styles.childrenOpen : ''} `}>
                <div className={`${openNav ? styles.bgAdmin : ''} `} onClick={() => { setOpenNav(!openNav) }}></div>
                <div className={styles.HeaderAdmin}>
                    <button onClick={() => setOpenNav(!openNav)}><MdMenu /></button>
                    <div>
                        <h3>Hola, <span>{userName}</span></h3>
                        <button onClick={loggingOut}><MdExitToApp /></button>
                    </div>
                </div>
                {page === 'dashboard' && <ContainerDashboard />}
                {page === 'admins' && <ContainerUsers admins={true} />}
                {page === 'users' && <ContainerUsers />}
                {page === 'orders' && <ContainerOrders />}
                {page === 'category' && <ContainerCategories />}
                {page === 'products' && <ContainerProducts />}
            </div>
            <ToastContainer />
        </div >
    )
}


export default Admin