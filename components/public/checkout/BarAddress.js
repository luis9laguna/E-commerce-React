import styles from './BarAddress.module.scss'
import { getAddressMap } from 'utils/utils'

const BarAddress = ({ addressesUser, addressNoUser, isLoggedIn }) => {


    const selectedAddress = isLoggedIn ? addressesUser.find(address => address._id === address.user.address)?.address : addressNoUser?.address

    return (
        <div className={styles.barAddress}>
            <h2>Dirección seleccionada:</h2>
            <p> {selectedAddress ? `${selectedAddress?.name}, ${getAddressMap(selectedAddress?.region)}, ${getAddressMap(selectedAddress?.provincia)},
             ${getAddressMap(selectedAddress?.comuna)}, ${selectedAddress?.street}, ${selectedAddress?.numStreet}, ${selectedAddress?.infoHome}, ${selectedAddress?.rut},
              ${selectedAddress?.phone}, ${selectedAddress?.extraInfo}`
                : 'No has seleccionado ninguna dirección por el momento'}</p>
        </div>
    )
}

export default BarAddress