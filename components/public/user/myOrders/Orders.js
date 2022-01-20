import styles from './Orders.module.css'


export default function orders() {
    return (
        <div className={styles.container}>
            <div className={styles.order}>
                <div>
                    <span className={styles.title}>Date</span>
                    <span className={styles.information}>12.29.2021</span>
                </div>
                <div>
                    <span className={styles.title}>Total</span>
                    <span className={styles.information}>$150</span>
                </div>
                <div>
                    <span className={styles.title}>Status</span>
                    <span className={styles.information}>Pending...</span>

                </div>
                <button className={styles.button}>Details</button>
            </div>
            <div className={styles.order}>
                <div>
                    <span className={styles.title}>Date</span>
                    <span className={styles.information}>12.29.2021</span>
                </div>
                <div>
                    <span className={styles.title}>Total</span>
                    <span className={styles.information}>$150</span>
                </div>
                <div>
                    <span className={styles.title}>Status</span>
                    <span className={styles.information}>Pending...</span>

                </div>
                <button className={styles.button}>Details</button>
            </div>
        </div>
    )
}
