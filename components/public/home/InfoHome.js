import styles from '@/styles/pages/home/InfoHome.module.scss'
import { FaCheckCircle, FaCreditCard, FaShippingFast } from 'react-icons/fa';

const InfoHome = () => {

    return (
        <div className={styles.container}>
            <div>
                <FaCheckCircle />
                <p>En Faisca siempre trabajamos con la mayor calidad del mercado, puedes estar seguro que recibiras alta calidad en cada una de tus compras.</p>
            </div>
            <div>
                <FaShippingFast />
                <p>Envios a todo el pais, aseguramos tu orden.</p>
            </div>
            <div>
                <FaCreditCard />
                <p>Puedes cancelar con tarjeta de credito o debito, la forma mas confiable de comprar.</p>
            </div>

        </div>
    )
}

export default InfoHome