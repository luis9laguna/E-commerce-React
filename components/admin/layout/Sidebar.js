import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArchiveOutlined, DashboardOutlined, Menu, PersonOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import styles from './Sidebar.module.css'

const Sidebar = ({ children }) => {

    const [openNav, setOpenNav] = useState(false);

    const router = useRouter()

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
                        <Link href="/admin/dashboard">
                            <div>
                                <PersonOutlined className={styles.icon} />
                                <span className={styles.linksName}>Users</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Users</span>
                    </li>
                    <li>
                        <Link href="/admin/dashboard">
                            <div>
                                <ShoppingCartOutlined className={styles.icon} />
                                <span className={styles.linksName}>Orders</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Orders</span>
                    </li>
                    <li>
                        <Link href="/admin/dashboard">
                            <div>
                                <ArchiveOutlined className={styles.icon} />
                                <span className={styles.linksName}>Inventory</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>Inventory</span>
                    </li>
                </ul>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
};

export default Sidebar;
