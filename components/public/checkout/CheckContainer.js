import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import useFetch from 'use-http'
import Swal from 'sweetalert2'
import { useAuth } from 'context/auth/authContext'
import { useCart } from 'context/cart/cartContext's
import BarAddress from './BarAddress'
import AddressesInfo from '../ui/addresses/AddressesInfo'
import FormAddress from '../ui/addresses/FormAddress'
import ErrorMessage from '../ui/ErrorMessage'
import Loading from '../ui/Loading'
import ModalForm from '../ui/addresses/ModalForm'
import styles from '@/styles/CheckContainer.module.css'


const CheckContainer = () => {

    const { items } = useCart()
    const { isLoggedIn } = useAuth()

    const router = useRouter()

    //MODAL FORM
    const [modalFormAddress, setModalFormAddress] = useState(false);
    const [addressUpdate, setAddressUpdate] = useState('');
    const [reFetchAddress, setReFetchAddress] = useState(false)

    //HANDLER OF MODAL FORM ADDRESS
    const handlerShowFormAddress = () => setModalFormAddress(!modalFormAddress);

    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let token
    if (storage) token = localStorage.getItem('token')
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': token } }
    const { get, post, response, loading, error } = useFetch(`${process.env.url}`, options)

    //MODAL ADDRESS
    const [actionAddress, setActionAddress] = useState(false);
    const [addressUser, setAddressUser] = useState('');
    const [addressId, setAddressId] = useState('');

    useEffect(() => { if (addressId) getAddress() }, [addressId])

    useEffect(() => {
        const cookiesAddress = Cookies.get('awl')
        if (cookiesAddress && !isLoggedIn) setAddressId(cookiesAddress)
        else if (isLoggedIn) getUser()
    }, [isLoggedIn])

    const getAddress = async () => {
        const addressResp = await get(`address/${addressId}`)
        if (response.ok) setAddressUser(addressResp.address)
    }

    const getUser = async () => {
        const userResp = await get(`/user`)
        if (response.ok) setAddressId(userResp.user.address)
        if (userResp.address === undefined) setAddressUser('')
    }

    const goToPay = async () => {
        let orderItems = new Array
        for (const item of items) {
            const orderItem = { product: item.id, quantity: item.quantity }
            orderItems.push(orderItem)
        }
        const order = { orderItems, address: addressId }

        await post('order', order)
        if (response.ok) {
            Swal.fire(
                'Excelente!',
                'Tu orden ha sido creada.',
                'success'
            )
        }
    }

    const total = () => {
        const arrayTotalPriceItem = items.map(item => (
            item.price * item.quantity
        ))
        return arrayTotalPriceItem.reduce((a, b) => a + b, 0)
    }

    return (
        <div className={styles.container}>
            {loading ? <Loading space={true} /> :
                <>
                    <BarAddress setActionAddress={setActionAddress} addressUser={addressUser} />
                    <div>
                        <div className={styles.addresses}>
                            {
                                actionAddress &&
                                <>
                                    {isLoggedIn ?
                                        <AddressesInfo
                                            showModal={handlerShowFormAddress}
                                            setAddressUpdate={setAddressUpdate}
                                            reFetchAddress={reFetchAddress}
                                            setReFetchAddress={setReFetchAddress}
                                            setAddressId={setAddressId}
                                            getUser={getUser}
                                        />
                                        : <FormAddress setActionAddress={setActionAddress} setAddressId={setAddressId} notLogged={true} />
                                    }
                                </>
                            }
                        </div>
                        <div className={styles.summary}>
                            <h2>RESUMEN DE LA ORDEN</h2>
                            <div className={styles.containerDetailProduct}>
                                {items.map((item, i) => (
                                    <div key={i} className={styles.productDetail}>
                                        <div>
                                            <img src={item.image} />
                                            <div>
                                                <b>{item.name}</b>
                                                <span>{item.quantity} un.</span>
                                            </div>
                                        </div>
                                        <span>${item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div>
                                <span>Subtotal</span>
                                <b>$ {total()}</b>
                            </div>
                            <div>
                                <span>Envio estimado</span>
                                <b>$ 15</b>
                            </div>
                            <div>
                                <span>Total</span>
                                <b>$ {total() + 15}</b>
                            </div>
                            <button disabled={!addressId} className={styles.button} onClick={goToPay}>
                                {loading ? <Loading light={true} /> : 'PAGAR AHORA'}
                            </button>
                            {error && <ErrorMessage message={response.data.message} />}
                        </div>
                    </div>
                </>
            }
            {error && <ErrorMessage />}
            {modalFormAddress && <ModalForm
                hideModal={handlerShowFormAddress}
                addressUpdate={addressUpdate}
                setReFetchAddress={setReFetchAddress}
                setActionAddress={setActionAddress}
                setAddressId={setAddressId} />}
        </div>
    )
}

export default CheckContainer