import { Facebook, Instagram, Twitter, WhatsApp } from '@material-ui/icons';
import styles from '@/styles/layout/TopNav.module.css';
import SignLog from '@/components/public/ui/SignLog';

const TopNav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <a href="https://www.whatsapp.com">
                    <WhatsApp />
                </a>
                <a href="https://www.instagram.com">
                    <Instagram />
                </a>
                <a href="https://www.facebook.com">
                    <Facebook />
                </a>
                <a href="https://www.twitter.com">
                    <Twitter />
                </a>
            </div>
            <SignLog />
        </div>
    )
}

export default TopNav

