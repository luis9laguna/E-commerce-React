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
                    We have one of the best quality on the market, you can rest assure that you will received a HQ Product.
                </p>
            </div>
            <div>
                <span>
                    <LocalShippingOutlined style={{ color: "black", fontSize: "5rem" }} />
                </span>
                <p>
                    Shippings to all the country, we secured your order.
                </p>
            </div>
            <div>
                <span>
                    <CreditCardOutlined style={{ color: "black", fontSize: "5rem" }} />
                </span>
                <p>
                    You can pay with CreditCard and DebitCart, the most confiable way of buying.
                </p>
            </div>

        </div>
    )
}

export default InfoHome