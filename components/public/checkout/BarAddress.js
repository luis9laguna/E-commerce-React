import styles from './BarAddress.module.css'

const BarAddress = ({ setActionAddress, addressUser }) => {


    return (
        <div className={styles.barAddress}>
            <h3>Selected Address</h3>
            <div> {addressUser !== '' ? `${addressUser.name}, ${addressUser.phone}, ${addressUser.id}, ${addressUser.state}, ${addressUser.city}
            , ${addressUser.province}, ${addressUser.street}, ${addressUser.numstreet}, ${addressUser.apartment || ''}`
                : 'You havent selected any address at the moment'}</div>
            <button onClick={() => setActionAddress(true)}>{addressUser ? 'Update Address' : 'Create Address'}</button>
        </div>
    )
}

export default BarAddress