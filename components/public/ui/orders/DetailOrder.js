import Modal from "@/components/public/ui/Modal"
import styles from "@/styles/ui/order/DetailOrder.module.scss"
import { getDate, formatCurrency } from 'utils/utils'

const DetailOrder = ({ onClose, detailOrder }) => {

    const address = detailOrder.address

    return (
        <Modal onClose={onClose}>
            <div className={styles.containerDetail}>
                <div className={styles.top}>
                    <span>Estado</span>
                    <span className={styles.status}>{detailOrder.status}</span>
                    <span>{getDate(detailOrder.updated)}</span>
                </div>
                <div className={styles.containerTable}>
                    <table>
                        <thead>
                            <tr className={styles.tr}>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailOrder.orderItems.map((item, i) => (
                                <tr key={i}>
                                    <td className={styles.tableProduct}>
                                        <img src={item.product.image} />
                                        <span>{item.product.name}</span>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.product.price)}</td>
                                </tr>
                            ))
                            }
                            {detailOrder.orderItems.map((item, i) => (
                                <tr key={i}>
                                    <td className={styles.tableProduct}>
                                        <img src={item.product.image} />
                                        <span>{item.product.name}</span>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.product.price)}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className={styles.extraInfo}>
                    <div className={styles.address}>
                        <div className={styles.infoTitle}>Dirección</div>
                        <span>{address.name}</span>
                        <span>{address.rut}</span>
                        <span>{address.phone}</span>
                        <span>{address.street}, {address.numstreet}</span>
                        <span>{address.province}</span>
                        <span>{address.state}</span>
                    </div>
                    <div className={styles.bill}>
                        <div className={styles.infoTitle}>Detalles de pago</div>
                        <div>Subtotal: <span>{formatCurrency(detailOrder.total - detailOrder.shipping)}</span></div>
                        <div>Envio: <span>{formatCurrency(detailOrder.shipping)}</span></div>
                        <div className={styles.total}>TOTAL: <span>{formatCurrency(detailOrder.total)}</span></div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default DetailOrder