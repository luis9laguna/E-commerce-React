import { Facebook, Instagram, Twitter, WhatsApp } from '@material-ui/icons';
import styles from '@/styles/layout/TopNav.module.css';
import SignLog from '@/components/public/ui/SignLog';

const TopNav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <WhatsApp />
                <Instagram />
                <Facebook />
                <Twitter />
            </div>
            <SignLog />
        </div>
    )
}

export default TopNav

