import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import { getAllOrdersByUser, getStatusOrder } from 'helpers/api-util'
import styles from '@/styles/user/Orders.module.css'


export default function Orders({ showModal, setDetailOrder }) {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //ORDERS
    const [dbInfo, setDbInfo] = useState([])

    const router = useRouter()

    useEffect(async () => {
        await getAllOrdersByUser(page).then(resp => {
            setDbInfo(resp)
            setPage(resp.page)
            setPages(resp.pages)
        })
    }, [page])


    //DATE
    const getDate = (data) => {
        const date = new Date(data)
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }

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

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)
        router.push(`/user/myOrders?page=${selectedPage + 1}`)
    }


    return (
        <div className={styles.container}>
            {dbInfo?.orders?.map((order, i) => (
                <div className={styles.order} key={i}>
                    <div>
                        <span className={styles.title}>Order Date</span>
                        <span className={styles.information}>{getDate(order.createdAt)}</span>
                    </div>
                    <div>
                        <span className={styles.title}>Total</span>
                        <span className={styles.information}>${order.total}</span>
                    </div>
                    <div>
                        <span className={styles.title}>Status</span>
                        <span className={styles.information}>{order.status}</span>

                    </div>
                    <button className={styles.button} onClick={() => handlerModalDetails(order.code)}>Details</button>
                </div>
            ))}
            <ReactPaginate
                containerClassName={'pagination'}
                activeClassName={'active'}
                disabledClassName={'disabled-page'}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pages}
                forcePage={page - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}
