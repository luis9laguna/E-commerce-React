import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import styles from '@/styles/ui/orders/ContainerOrders.module.css'
import TableOrders from './TableOrders'
import Pagination from '../Pagination'
import Loading from '../Loading'

const ContainerOrders = ({ showModal, setDetailOrder }) => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [newSort, setNewSort] = useState('all')

    //ORDERS
    const [dbInfo, setDbInfo] = useState([])

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

    //IN ADMIN?
    const router = useRouter()
    const inAdmin = router.pathname === '/admin/orders'

    useEffect(() => {
        getOrders(1, newSort)
    }, [])

    const getOrders = async (page, sort) => {
        let order
        if (inAdmin) {
            order = await get(`order?page=${page}&sort=${sort}`)
            if (response.ok) {
                setDbInfo(order.orders)
                setPage(order.page)
                setPages(order.pages)
            }
        } else {
            order = await get(`order/user/all?page=${page}&limit=5`)
            if (response.ok) {
                setDbInfo(order.orders)
                setPage(order.page)
                setPages(order.pages)
            }
        }
    }

    const sortOrders = e => {
        const sort = e.target.value
        setNewSort(sort)
        getOrders(1, sort)
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)
        getOrders(selectedPage + 1, newSort)
    }

    return (
        <div className={styles.container}>
            {inAdmin &&
                <div className={styles.sortContainer}>
                    <span>Ordenar Por:</span>
                    <select id="status" onChange={sortOrders}>
                        <option value='all'>Todos</option>
                        <option value="pending">Pendientes</option>
                        <option value="processing">Procesando</option>
                        <option value="shipping">Enviando</option>
                        <option value="delivered">Entregado</option>
                    </select>
                </div>
            }

            <div className={styles.orderHeader}>
                <span className={styles.title}>Fecha de Orden</span>
                <span className={styles.title}>Total</span>
                <span className={styles.title}>Estado</span>
                <span className={styles.title}>Detalle</span>

            </div>

            {error && <h2 style={{ textAlign: 'center' }}>Lo siento, no pudimos encontrar lo que estabas buscando.</h2>}
            {loading && !error ? <Loading space={true} />
                :
                <TableOrders
                    dbInfo={dbInfo}
                    showModal={showModal}
                    setDetailOrder={setDetailOrder}
                    inAdmin={inAdmin}
                    getOrders={getOrders} />
            }
            <Pagination page={page} pages={pages} handlePageClick={handlePageClick} />
        </div>
    )
}

export default ContainerOrders
