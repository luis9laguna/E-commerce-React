import { EditOutlined, RemoveCircleOutlined } from '@material-ui/icons'
import styles from './Information.module.css'

export default function information() {
    return (
        <div className={styles.container}>
            <div className={styles.address}>
                <h3 className={styles.name}>Name</h3>

                <div className={styles.info}>
                    <input className={styles.input} defaultValue='phone' />
                    <input className={styles.input} defaultValue='rut' />
                    <input className={styles.input} defaultValue='state' />
                    <input className={styles.input} defaultValue='city' />
                    <input className={styles.input} defaultValue='province' />
                    <input className={styles.input} defaultValue='street' />
                    <input className={styles.input} defaultValue='nmrostreet' />
                    <input className={styles.input} defaultValue='dpto' />
                </div>
                <div className={styles.default}>
                    <input className={styles.check} type='checkbox' />
                    Make this a default address
                </div>
                <div className={styles.options}>
                    <div>
                        <RemoveCircleOutlined />
                    </div>
                    <div>
                        <EditOutlined />
                    </div>
                </div>
            </div>

            <div className={styles.address}>
                <h3 className={styles.name}>Name</h3>

                <div className={styles.info}>
                    <input className={styles.input} defaultValue='phone' />
                    <input className={styles.input} defaultValue='rut' />
                    <input className={styles.input} defaultValue='state' />
                    <input className={styles.input} defaultValue='city' />
                    <input className={styles.input} defaultValue='province' />
                    <input className={styles.input} defaultValue='street' />
                    <input className={styles.input} defaultValue='nmrostreet' />
                    <input className={styles.input} defaultValue='dpto' />
                </div>
                <div className={styles.default}>
                    <input className={styles.check} type='checkbox' />
                    Make this a default address
                </div>
                <div className={styles.options}>
                    <div>
                        <RemoveCircleOutlined />
                    </div>
                    <div>
                        <EditOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}
