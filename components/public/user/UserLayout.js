import styles from '@/styles/UserLayout.module.css'
import { AddLocationOutlined, ArrowForwardIosOutlined, LockOutlined, PersonOutlined, ShoppingBasketOutlined } from '@material-ui/icons';
import Link from 'next/link';


export default function information({ children }) {



    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <ul className={styles.list} >
                    <Link href='/user/userInformation'>
                        <li >
                            <PersonOutlined style={{ fontSize: "2.5rem" }} />
                            <span>User Information</span>
                            <ArrowForwardIosOutlined />
                        </li>
                    </Link>
                    <Link href='/user/changePassword'>
                        <li>
                            <LockOutlined style={{ fontSize: "2.5rem" }} />
                            <span>
                                Change password
                            </span>
                            <ArrowForwardIosOutlined />
                        </li>
                    </Link>
                    <Link href='/user/myOrders'>
                        <li>
                            <ShoppingBasketOutlined style={{ fontSize: "2.5rem" }} />
                            <span>
                                My orders
                            </span>
                            <ArrowForwardIosOutlined />

                        </li>
                    </Link>
                    <Link href='/user/addresses'>
                        <li>
                            <AddLocationOutlined style={{ fontSize: "2.5rem" }} />
                            <span>
                                Addresses
                            </span>
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
