import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import styles from '@/styles/ui/order/ContainerOrders.module.scss'
import Pagination from '../Pagination'
import { toast } from 'react-toastify'
import { getDate, formatCurrency } from 'utils/utils'
import { TbAlertTriangle } from 'react-icons/tb'
import { SyncLoader } from 'react-spinners'
import DetailOrder from './DetailOrder'
import Cookies from 'js-cookie'


const ContainerOrders = () => {

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { get, post, put, response, loading } = useFetch(`${process.env.url}`, options)

    const [data, setData] = useState({
        page: 1,
        pages: 0,
        orders: [],
        sort: 'all',
    })
    const [detailOrder, setDetailOrder] = useState(null)

    //IN ADMIN?
    const router = useRouter()
    const inAdmin = router.pathname === '/admin'

    useEffect(() => { getOrders(1, data.sort) }, [getOrders, data.sort])

    const getOrders = useCallback(async (page, sort) => {

        let url = inAdmin ?
            `order?page=${page}&sort=${sort}` :
            `order/user/all?page=${page}&limit=5`

        await get(url)
        if (response.ok) {
            const { orders, page, pages } = response.data
            setData(prev => ({ ...prev, orders, page, pages }))
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }

    }, [get, inAdmin, response])

    const sortOrders = e => {
        const sort = e.target.value
        setData(prev => ({ ...prev, sort }))
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setData(prev => ({ ...prev, page: selectedPage + 1 }))
        getOrders(selectedPage + 1, data.sort)
    }

    const updatingOrder = async (id, e) => {
        const value = { status: e.target.value }
        await put(`/order/${id}`, value)
        if (response.ok) {
            toast.success('¡La orden ha sido actualizada exitosamente!')
            getOrders(1, 'all')
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }

    const handlerModalDetails = async (code) => {

        const detailOrder = await get(`/order/code/${code}`)
        if (response.ok) {
            setDetailOrder(detailOrder.order)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }

    return (
        <>
            {loading ? <div className={styles.loader}><SyncLoader color='#303030' size={50} /></div> :
                <div className={styles.containerOrder}>
                    {inAdmin &&
                        <div className={styles.sortContainer}>
                            <span>Ordenar Por:</span>
                            <select id="status" value={data.sort} onChange={sortOrders}>
                                <option value='all'>Todos</option>
                                <option value="pending">Pendientes</option>
                                <option value="processing">Procesando</option>
                                <option value="shipping">Enviando</option>
                                <option value="delivered">Entregado</option>
                            </select>
                        </div>
                    }

                    <div className={styles.orderHeader}>
                        <span>Fecha de Orden</span>
                        <span>Total</span>
                        <span>Estado</span>
                        <span>Detalle</span>
                    </div>
                    {!data.orders ? <p className={styles.noOrder}><span>No se han encontrado ordenes</span> <TbAlertTriangle /> </p> :
                        <>
                            {data.orders?.map((order, i) => (
                                <div className={styles.order} key={i}>
                                    <div>
                                        <span className={styles.title}>Fecha de orden</span>
                                        <span className={styles.information}>{getDate(order.createdAt)}</span>
                                    </div>
                                    <div>
                                        <span className={styles.title}>Total</span>
                                        <span className={styles.information}>{formatCurrency(order.total)}</span>
                                    </div>
                                    <div>
                                        <span className={styles.title}>Estado</span>

                                        {inAdmin ?
                                            (
                                                <select value={order.status} id="status" onChange={(e) => updatingOrder(order._id, e)}>
                                                    <option value="pending">Pendiente</option>
                                                    <option value="processing">Procesando</option>
                                                    <option value="shipping">Enviado</option>
                                                    <option value="delivered">Entregado</option>
                                                </select>
                                            ) :
                                            <span className={styles.information}>{order.status}</span>
                                        }

                                    </div>
                                    <button onClick={() => handlerModalDetails(order.code)}>Detalles</button>
                                </div>
                            ))}
                        </>
                    }

                    {data.pages > 1 && <Pagination page={data.page} pages={data.pages} handlePageClick={handlePageClick} />}
                </div>
            }
            {detailOrder && <DetailOrder onClose={() => setDetailOrder(null)} detailOrder={detailOrder} />}
        </>
    )
}

export default ContainerOrders
