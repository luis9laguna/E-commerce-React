import { Facebook, Instagram, MailOutline, Map, Phone, Twitter, WhatsApp } from '@material-ui/icons';
import styles from '@/styles/layout/Footer.module.css';
import Link from "next/link";
import Newsletter from './elements/Newsletter';
import Whatsapp from './elements/Whatsapp';

const Footer = () => {
    return (
        <>
            <Newsletter />
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1 className={styles.logo}>SHOOP.</h1>
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className={styles.socialContainer}>
                        <a href="https://www.facebook.com">
                            <Facebook className={styles.facebook} />
                        </a>
                        <a href="https://www.twitter.com">
                            <Twitter className={styles.twitter} />
                        </a>
                        <a href="https://www.whatsapp.com">
                            <WhatsApp className={styles.whatsapp} />
                        </a>
                        <a href="https://www.instagram.com">
                            <Instagram className={styles.instagram} />
                        </a>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.title}>Useful Links</div>
                    <ul className={styles.list}>
                        <li> <Link href='/'>Home</Link> </li>
                        <li><Link href='/product/all'>All Products</Link></li>
                        <li><Link href='/wishList'> WishList</Link></li>
                        <li><Link href='/cart'>Cart</Link></li>
                        <li><Link href='/login#register'>Register</Link></li>
                        <li><Link href='/login#login'>Log In</Link></li>
                        <li><Link href='/statusOrder'>Status of package</Link></li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>Contact</div>
                    <span>
                        <Map style={{ marginRight: '10px' }} /> 678, pathser, south bosttom 54615
                    </span>
                    <span>
                        <Phone style={{ marginRight: '10px' }} />  +1 234 56 78
                    </span>
                    <span>
                        <MailOutline style={{ marginRight: '10px' }} /> contact@shoop.info
                    </span>
                    <img className={styles.payment} src="https://i.ibb.co/Qfvn4z6/payment.png" />
                </div>
                <a href="https://www.whatsapp.com">
                    <Whatsapp />
                </a>
            </div>
        </>
    )
}

export default Footer