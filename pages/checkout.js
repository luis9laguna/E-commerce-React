import { useEffect, useState } from "react";
import { useAuth } from "context/auth/authContext";
import { getUserInfo } from "helpers/api-util";
import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import CheckContainer from '@/components/public/checkout/CheckContainer'
import AddressesInfo from "@/components/public/user/userOptions/addresses/AddressesInfo";
import FormAddress from "@/components/public/user/userOptions/addresses/FormAddress";

export default function Checkout() {

    const [modalFormAddress, setModalFormAddress] = useState(false);
    const [addressUpdate, setAddressUpdate] = useState('');
    const [reFetchAddress, setReFetchAddress] = useState(false)
    const [userHasAddress, setUserHasAddress] = useState(false)

    //HANDLER OF MODAL FORM ADDRESS
    const handlerShowFormAddress = () => setModalFormAddress(!modalFormAddress);

    //CHECK IF USER IS LOGGED
    const { isLoggedIn } = useAuth()

    useEffect(async () => {
        if (reFetchAddress && isLoggedIn) {
            await getUserInfo().then(resp => {
                if (resp.ok) {
                    setUserHasAddress(resp.user.address !== null)
                }
            })
        }
    }, [reFetchAddress])

    useEffect(async () => {
        if (isLoggedIn) {
            await getUserInfo().then(resp => {
                if (resp.ok) {
                    setUserHasAddress(resp.user.address !== null)
                }
            })
        }
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
