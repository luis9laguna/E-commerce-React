import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAllOrders, getAllOrdersByUser } from 'helpers/api-util'
import styles from '@/styles/ui/orders/ContainerOrders.module.css'
import TableOrders from './TableOrders'

const ContainerOrders = ({ showModal, setDetailOrder }) => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //ORDERS
    const [dbInfo, setDbInfo] = useState([])

    //IN ADMIN?
    const router = useRouter()
    const inAdmin = router.pathname === '/admin/orders'

    useEffect(() => {
        getOrders(page)
    }, [])

    const getOrders = (page, sort) => {
        if (inAdmin) {
            getAllOrders(page, sort).then(resp => {
                setDbInfo(resp.orders)
                setPage(resp.page || 1)
                setPages(resp.pages || 1)
            })
        } else {
            getAllOrdersByUser(page).then(resp => {
                setDbInfo(resp.orders)
                setPage(resp.page || 1)
                setPages(resp.pages || 1)
            })
        }
    }

    const sortOrders = e => {
        const sort = e.target.value
        getOrders(page, sort)
    }




    return (
        <div className={styles.container}>
            {inAdmin ? (
                <div className={styles.sortContainer}>
                    <span>Sort By</span>
                    <select id="status" onChange={sortOrders}>
                        <option value='all'>All</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            ) : ''}

            <div className={styles.orderHeader}>
                <span className={styles.title}>Order Date</span>
                <span className={styles.title}>Total</span>
                <span className={styles.title}>Status</span>
                <span className={styles.title}>Detail</span>

            </div>

            <TableOrders
                dbInfo={dbInfo}
                showModal={showModal}
                setDetailOrder={setDetailOrder}
                inAdmin={inAdmin}
                getOrders={getOrders}
                setPage={setPage}
                pages={pages}
                page={page} />

        </div>
    )
}

export default ContainerOrders
