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
                        <Facebook className={styles.facebook} />
                        <Twitter className={styles.twitter} />
                        <WhatsApp className={styles.whatsapp} />
                        <Instagram className={styles.instagram} />
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.title}>Useful Links</div>
                    <ul className={styles.list}>
                        <li> <Link href='/'>Home</Link> </li>
                        <li><Link href='/allProducts'>All Products</Link></li>
                        <li><Link href='/aboutUs'>About Us</Link></li>
                        <li><Link href='/contactUs'>Contact Us</Link></li>
                        <li><Link href='/wishList'> WishList</Link></li>
                        <li><Link href='/cart'>Cart</Link></li>
                        <li><Link href='/auth/register'>Register</Link></li>
                        <li><Link href='/auth/login'>Log In</Link></li>
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
                <Whatsapp />
            </div>
        </>
    )
}

export default Footer