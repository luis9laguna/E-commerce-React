import { Send } from "@material-ui/icons";
import styles from '@/styles/layout/Newsletter.module.css';

const Newsletter = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Newsletter</h2>
            <p className={styles.description}>Get updates and offers from your favorite products.</p>
            <div className={styles.inputContainer}>
                <input placeholder="Your Email" />
                <button>
                    <Send />
                </button>
            </div>
        </div>
    )
}

export default Newsletter