import { useEffect, useState } from "react";
import { useAuth } from "context/auth/authContext";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import CheckContainer from '@/components/public/checkout/CheckContainer'
import AddressesInfo from "@/components/public/user/userOptions/addresses/AddressesInfo";
import FormAddress from "@/components/public/user/userOptions/addresses/FormAddress";

const Checkout = () => {

    const [modalFormAddress, setModalFormAddress] = useState(false);
    const [addressUpdate, setAddressUpdate] = useState('');
    const [reFetchAddress, setReFetchAddress] = useState(false)
    const [userHasAddress, setUserHasAddress] = useState(false)

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

    //HANDLER OF MODAL FORM ADDRESS
    const handlerShowFormAddress = () => setModalFormAddress(!modalFormAddress);

    //CHECK IF USER IS LOGGED
    const { isLoggedIn } = useAuth()

    const getUser = async () => {
        const user = await get(`/user`)
        if (response.ok) setUserHasAddress(user.user.address !== null)
    }

    useEffect(async () => {
        if (reFetchAddress && isLoggedIn) { getUser() }
    }, [reFetchAddress])

    useEffect(async () => {
        if (isLoggedIn) { getUser() }
    }, [])

    return (
        <Layout>
            <Meta title='Checkout' />
            <CheckContainer userHasAddress={userHasAddress}>
                <AddressesInfo
                    showModal={handlerShowFormAddress}
                    setAddressUpdate={setAddressUpdate}
                    reFetchAddress={reFetchAddress}
                    setReFetchAddress={setReFetchAddress}
                />
            </CheckContainer>

            {modalFormAddress && <FormAddress
                hideModal={handlerShowFormAddress}
                addressUpdate={addressUpdate}
                setReFetchAddress={setReFetchAddress} />}
        </Layout>
    )
}


export default Checkout
