import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import { useCallback, useEffect, useState } from "react";
import BarAddress from "@/components/public/ui/address/BarAddress";
import { SyncLoader } from "react-spinners";
import useFetch from "use-http";
import styles from '@/styles/pages/CheckOut.module.scss'
import { useAuth } from "context/auth/authContext";
import { useCart } from "context/cart/cartContext";
import { totalCart, formatCurrency, formatImages } from "utils/utils";
import Modal from "@/components/public/ui/Modal";
import AddressForm from "@/components/public/ui/address/AddressForm";
import AddressCards from "@/components/public/ui/address/AddressCards";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Checkout = () => {

    const { items } = useCart()
    const { isLoggedIn } = useAuth()

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { get, post, response, loading } = useFetch(`${process.env.url}`, options)

    const [addressesUser, setAddressesUser] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(null)
    const [addressNoUser, setAddressNoUser] = useState(null)
    const [chosenAddress, setChosenAddress] = useState(null)


    const getAllAddresses = useCallback(async () => {
        await get(`/address`)
        if (response.ok) {
            setAddressesUser(response.data.addresses)
            setChosenAddress(response.data.addresses[0]?.user.address)
        } else {
            toast.error('¡Ha ocurrido un error al obtener las direcciones, intente mas tarde!')
        }
    }, [get, response])


    const getAddress = useCallback(async (id) => {
        await get(`/address/${id}`)
        if (response.ok) {
            setAddressNoUser(response.data)
        }
    }, [get, response])


    useEffect

    useEffect(() => {
        if (isLoggedIn) {
            getAllAddresses()
        } else {
            const cookiesAddress = Cookies.get('awl')
            if (cookiesAddress) {
                setChosenAddress(cookiesAddress)
                getAddress(cookiesAddress)
            }
        }
    }, [getAllAddresses, isLoggedIn, getAddress])


    const closeAll = () => {
        setShowForm(false)
        setUpdateAddress(null)
    }

    const goToPay = async () => {
        let orderItems = new Array
        for (const item of items) {
            const orderItem = { product: item.id, quantity: item.quantity }
            orderItems.push(orderItem)
        }

        const order = { orderItems, address: chosenAddress }

        await post('order', order)
        if (response.ok) {
            toast.success('¡Tu orden ha sido creada exitosamente!')
        } else {
            toast.error('¡Tu orden no ha podido sido creada, intente mas tarde!')
        }
    }

    return (
        <Layout>
            <Meta title='Pago' />
            {loading ? <div className={styles.loader}><SyncLoader color='#303030' size={50} /></div> :
                <>
                    <BarAddress addressesUser={addressesUser} addressNoUser={addressNoUser} isLoggedIn={isLoggedIn} />
                    {!chosenAddress && <h3 className={styles.noChosenAddress}>{isLoggedIn ? 'Selecciona' : 'Crea'} una dirección para continuar</h3>}
                    <div className={styles.container}>
                        <div className={styles.addresses}>
                            {isLoggedIn ?
                                <AddressCards openForm={() => setShowForm(true)} addressesUser={addressesUser} setUpdateAddress={setUpdateAddress} getAllAddresses={getAllAddresses} />
                                :
                                <AddressForm setUpdateAddress={setUpdateAddress} notLogged={true} setAddressNoUser={setAddressNoUser} />
                            }
                            <div className={styles.disabledForm}></div>
                        </div>
                        <div className={styles.summary}>
                            <h2>RESUMEN ORDEN</h2>
                            <div className={styles.containerDetailProduct}>
                                {items.map((item, i) => (
                                    <div key={i} className={styles.productDetail}>
                                        <img src={formatImages(item.image)} />
                                        <h3>{item.name}</h3>
                                        <div>
                                            <span>{formatCurrency(item.price)}</span>
                                            <span>{item.quantity} un.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div>
                                <span>Subtotal</span>
                                <b>{totalCart(items)}</b>
                            </div>
                            <div>
                                <span>Envio estimado</span>
                                <b>{formatCurrency(3500)}</b>
                            </div>
                            <div>
                                <span>Total</span>
                                <b>{totalCart(items, true)}</b>
                            </div>
                            <button onClick={goToPay} disabled={!chosenAddress}>
                                <span>¡</span><span>G</span><span>R</span><span>A</span><span>C</span>
                                <span>I</span><span>A</span><span>S</span><span>!</span>
                                <p>PAGAR AHORA</p>
                            </button>
                        </div>
                    </div>
                </>
            }
            {showForm &&
                <Modal onClose={closeAll}>
                    <AddressForm closeForm={closeAll} getAllAddresses={getAllAddresses} setUpdateAddress={setUpdateAddress} updateAddress={updateAddress} />
                </Modal>}
        </Layout>
    )
}


export default Checkout
