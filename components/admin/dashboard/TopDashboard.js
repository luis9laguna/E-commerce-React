import styles from './TopDashboard.module.css'

const TopDashboard = ({ information }) => {
    return (
        <div className={styles.containerTop}>
            <div className={styles.containerSides}>
                <div>
                    <span>Total Cost</span>
                    <span className={styles.number}>${information.totalCost}</span>
                </div>

                <div>
                    <span>Total Sold</span>
                    <span className={styles.number}>${information.totalSold}</span>
                </div>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.center}>
                    <div>
                        <span>Revenue of the Month</span>
                        <span className={styles.number}>${information.RevenueLastMonth}</span>
                    </div>
                    <div className={styles.finishedOrders}>
                        <span>Finished Orders</span>
                        <span>({information.totalLastMonth})</span>
                    </div>
                </div>
            </div>
            <div className={styles.containerSides}>
                <div>
                    <span>Total Revenue</span>
                    <span className={styles.number}>${information.totalRevenue}</span>
                </div>
                <div>
                    <span>Total Orders</span>
                    <span className={styles.number}>{information.totalCompleted}</span>
                </div>
            </div>
        </div>
    )
}

export default TopDashboard