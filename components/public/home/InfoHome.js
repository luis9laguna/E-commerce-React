import { CheckCircle, CreditCardOutlined, LocalShippingOutlined } from "@material-ui/icons";
import styles from '@/styles/home/InfoHome.module.css'


const InfoHome = () => {

    return (
        <div className={styles.container}>
            <div>
                <span>
                    <CheckCircle style={{ color: "black", fontSize: "5rem" }} />
                </span>
                <p>
                    En Faisca siempre trabajamos con la mayor calidad del mercado, puedes estar seguro que recibiras alta calidad en cada una de tus compras.
                </p>
            </div>
            <div>
                <span>
                    <LocalShippingOutlined style={{ color: "black", fontSize: "5rem" }} />
                </span>
                <p>
                    Envios a todo el pais, aseguramos tu orden.
                </p>
            </div>
            <div>
                <span>
                    <CreditCardOutlined style={{ color: "black", fontSize: "5rem" }} />
                </span>
                <p>
                    Puedes cancelar con tarjeta de credito o debito, la forma mas confiable de comprar.
                </p>
            </div>

        </div>
    )
}

export default InfoHome