import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import { getStatusOrder, updateOrder } from 'helpers/api-util'
import styles from '@/styles/ui/orders/TableOrders.module.css'

const TableOrders = (props) => {

    const {
        dbInfo,
        showModal,
        setDetailOrder,
        inAdmin,
        getOrders,
        setPage,
        pages,
        page
    } = props

    //HANDLER MODAL
    const handlerModalDetails = (code) => {
        //SEND
        getStatusOrder({ code }).then(resp => {
            if (resp.ok) {
                //MODAL
                setDetailOrder(resp.order)
                showModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'there was an error try again later',
                })
            }
        })
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

    const updatingOrder = (id, e) => {
        const value = { status: e.target.value }
        updateOrder(id, value).then(resp => {
            if (resp.ok) {
                Swal.fire(
                    'Good job!',
                    resp.message,
                    'success'
                )
                getOrders(page)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'there was an error try again later',
                })
            }
        })
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)
        getOrders(selectedPage + 1)
    }


    return (
        <>
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
                        <button className={styles.button} onClick={() => handlerModalDetails(order.code)}>Details</button>
                    </div>
                ))}
            </div>
            <ReactPaginate
                containerClassName={'pagination'}
                activeClassName={'active'}
                disabledClassName={'disabled-page'}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={3}
                forcePage={page - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default TableOrders