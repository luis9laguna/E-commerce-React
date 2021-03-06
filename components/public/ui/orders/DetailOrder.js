import Modal from "@/components/public/ui/Modal"
import styles from "@/styles/ui/orders/DetailOrder.module.css"

const DetailOrder = ({ hideModal, detailOrder }) => {

    //DATE
    const date = new Date(detailOrder.updated)
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(date)

    const address = detailOrder.address

    return (
        <Modal onClose={hideModal}>
            <div className={styles.top}>
                <span>Estado</span>
                <span className={styles.status}>{detailOrder.status}</span>
                <span >{formattedDate}</span>
            </div>
            <table className={styles.table}>
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
                            <td>${item.product.price}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
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
                    <div>Subtotal: <span>${detailOrder.total - detailOrder.shipping}</span></div>
                    <div>Envio: <span>${detailOrder.shipping}</span></div>
                    <div className={styles.total}>TOTAL: <span>${detailOrder.total}</span></div>
                </div>

            </div>
            <div className={styles.containerButton}>
                <button className={styles.button} onClick={hideModal}>Cerrar</button>
            </div>
        </Modal>
    )
}


export default DetailOrder