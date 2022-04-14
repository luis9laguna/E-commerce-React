import styles from './BarAddress.module.css'

const BarAddress = ({ setActionAddress, addressUser }) => {


    return (
        <div className={styles.barAddress}>
            <h3>Seleccionar Dirección</h3>
            <div> {addressUser !== '' ? `${addressUser.name}, ${addressUser.phone}, ${addressUser.id}, ${addressUser.state}, ${addressUser.city}
            , ${addressUser.province}, ${addressUser.street}, ${addressUser.numstreet}, ${addressUser.apartment || ''}`
                : 'No has seleccionado ninguna dirrecion por el momento'}</div>
            <button onClick={() => setActionAddress(true)}>{addressUser ? 'Actualizar dirección' : 'Crear dirección'}</button>
        </div>
    )
}

export default BarAddress