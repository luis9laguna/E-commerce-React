import useFetch from 'use-http'
import Swal from 'sweetalert2'
import styles from '@/styles/ui/orders/TableOrders.module.css'
import Loading from '../Loading'

const TableOrders = (props) => {

    const {
        dbInfo,
        showModal,
        setDetailOrder,
        inAdmin,
        getOrders,
    } = props

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}`, options)


    //HANDLER MODAL
    const handlerModalDetails = async (code) => {

        const detailOrder = await post(`/order/code/status`, { code })
        if (response.ok) {
            //MODAL
            setDetailOrder(detailOrder.order)
            showModal()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'there was an error try again later',
            })
        }
    }

    //DATE
    const getDate = (data) => {
        const date = new Date(data)
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }

    const updatingOrder = async (id, e) => {
        const value = { status: e.target.value }
        await put(`/order/${id}`, value)
        if (response.ok) {
            Swal.fire(
                'Good job!',
                response.data.message,
                'success'
            )
            getOrders(1, 'all')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'there was an error try again later',
            })
        }

    }


    return (
        <div className={styles.containerOrder}>
            {dbInfo?.map((order, i) => (
                <div className={styles.order} key={i}>
                    <div>
                        <span className={styles.titleInside}>Order Date</span>
                        <span className={styles.information}>{getDate(order.createdAt)}</span>
                    </div>
                    <div>
                        <span className={styles.titleInside}>Total</span>
                        <span className={styles.information}>${order.total}</span>
                    </div>
                    <div>
                        <span className={styles.titleInside}>Status</span>

                        {inAdmin ?
                            (
                                <select value={order.status} id="status" onChange={(e) => updatingOrder(order._id, e)}>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipping">Shipping</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            ) :
                            <span className={styles.information}>{order.status}</span>
                        }

                    </div>
                    <button className={styles.button} onClick={() => handlerModalDetails(order.code)}>
                        {loading ? <Loading light={true} /> : 'Details'}
                    </button>
                    {error && "There was an error try again later."}
                </div>
            ))}
        </div>
    )
}

export default TableOrders