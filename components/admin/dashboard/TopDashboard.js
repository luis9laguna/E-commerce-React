import styles from './TopDashboard.module.css'

const TopDashboard = ({ information }) => {
    return (
        <div className={styles.containerTop}>
            <div className={styles.containerSides}>
                <div>
                    <span>Total Costos</span>
                    <span className={styles.number}>${information.totalCost}</span>
                </div>

                <div>
                    <span>Total Vendidos</span>
                    <span className={styles.number}>${information.totalSold}</span>
                </div>
            </div>
            <div className={styles.containerCenter}>
                <div className={styles.center}>
                    <div>
                        <span>Ingresos del mes</span>
                        <span className={styles.number}>${information.RevenueLastMonth}</span>
                    </div>
                    <div className={styles.finishedOrders}>
                        <span>Ordenes terminadas</span>
                        <span>({information.totalLastMonth})</span>
                    </div>
                </div>
            </div>
            <div className={styles.containerSides}>
                <div>
                    <span>Total beneficio</span>
                    <span className={styles.number}>${information.totalRevenue}</span>
                </div>
                <div>
                    <span>Total ordenes</span>
                    <span className={styles.number}>{information.totalCompleted}</span>
                </div>
            </div>
        </div>
    )
}

export default TopDashboard