import { useRouter } from 'next/router';
import { useAuth } from 'context/auth/authContext';
import styles from '@/styles/pages/User.module.scss'
import { MdLockOutline, MdOutlineAddLocation, MdOutlineArrowForwardIos, MdOutlineShoppingBasket, MdPersonOutline } from 'react-icons/md';
import { useState } from 'react';
import { SyncLoader } from 'react-spinners';
import Layout from '@/components/public/layout/Layout';
import Meta from '@/components/public/ui/Meta';
import UserDataForm from '@/components/public/user/UserDataForm';
import ChangePasswordForm from '@/components/public/user/ChangePasswordForm';
import AddressContainer from '@/components/public/ui/address/AddressContainer';
import ContainerOrders from '@/components/public/ui/orders/ContainerOrders';

const User = () => {

    const [page, setPage] = useState('info');

    const { isLoading, isLoggedIn } = useAuth()
    const router = useRouter()

    if (isLoading) return (
        <div className={styles.spinner}>
            <SyncLoader color={'#303030'} loading={isLoading} size={50} />
        </div>
    )
    if (!isLoggedIn) {
        router.replace('/')
        return <div></div>
    }

    return (
        <Layout>
            <Meta title='Perfil' />
            <div className={styles.container}>
                <div className={styles.navContainer}>
                    <ul>
                        <li>
                            <button className={page === 'info' ? styles.active : ''} onClick={() => setPage('info')}>
                                <MdPersonOutline />
                                <span>Información del usuario</span>
                                <MdOutlineArrowForwardIos />
                            </button>
                        </li>
                        <li>
                            <button className={page === 'change' ? styles.active : ''} onClick={() => setPage('change')}>
                                <MdLockOutline />
                                <span>Cambiar contraseña</span>
                                <MdOutlineArrowForwardIos />
                            </button>
                        </li>
                        <li>
                            <button className={page === 'order' ? styles.active : ''} onClick={() => setPage('order')}>
                                <MdOutlineShoppingBasket />
                                <span>Mis ordenes</span>
                                <MdOutlineArrowForwardIos />
                            </button>
                        </li>
                        <li>
                            <button className={page === 'address' ? styles.active : ''} onClick={() => setPage('address')}>
                                <MdOutlineAddLocation />
                                <span>Direcciones</span>
                                <MdOutlineArrowForwardIos />
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.pageContainer}>
                    {page === 'info' && <UserDataForm />}
                    {page === 'change' && <ChangePasswordForm />}
                    {page === 'order' && <ContainerOrders />}
                    {page === 'address' && <AddressContainer />}

                </div>
            </div>
        </Layout>
    )
}


export default User