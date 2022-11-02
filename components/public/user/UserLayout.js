import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from 'context/auth/authContext';
import styles from '@/styles/user/UserLayout.module.scss'
import { AddLocationOutlined, ArrowForwardIosOutlined, LockOutlined, PersonOutlined, ShoppingBasketOutlined } from '@material-ui/icons';

const UserLayout = ({ children }) => {

    const { isLoggedIn } = useAuth()
    const router = useRouter()


    if (!isLoggedIn) router.push('/')

    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <ul className={styles.list} >
                    <Link href='/user/userInformation'>
                        <li className={router.pathname === '/user/userInformation' ? styles.active : ''}>
                            <PersonOutlined style={{ fontSize: "2.5rem" }} />
                            <span>Información del usuario</span>
                            <ArrowForwardIosOutlined />
                        </li>
                    </Link>
                    <Link href='/user/changePassword'>
                        <li className={router.pathname === '/user/changePassword' ? styles.active : ''}>
                            <LockOutlined style={{ fontSize: "2.5rem" }} />
                            <span>Cambiar contraseña</span>
                            <ArrowForwardIosOutlined />
                        </li>
                    </Link>
                    <Link href='/user/myOrders'>
                        <li className={router.pathname === '/user/myOrders' ? styles.active : ''}>
                            <ShoppingBasketOutlined style={{ fontSize: "2.5rem" }} />
                            <span>Mis ordenes</span>
                            <ArrowForwardIosOutlined />

                        </li>
                    </Link>
                    <Link href='/user/addresses'>
                        <li className={router.pathname === '/user/addresses' ? styles.active : ''}>
                            <AddLocationOutlined style={{ fontSize: "2.5rem" }} />
                            <span>Direcciones</span>
                            <ArrowForwardIosOutlined />
                        </li>
                    </Link>
                </ul>
            </div>
            <div className={styles.informationContainer}>
                {children}
            </div>
        </div>
    )
}


export default UserLayout