import { useAuth } from 'context/auth/authContext'
import { useCallback, useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { Autoplay } from 'swiper'
import useFetch from 'use-http'
import BarAddress from '../checkout/BarAddress'
import Modal from '../ui/Modal'
import AddressCards from './AddressCards'
import AddressForm from './AddressForm'

const AddressContainer = () => {

    const { isLoggedIn } = useAuth()

    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { get, response, loading } = useFetch(`${process.env.url}`, options)

    const [showForm, setShowForm] = useState(false)
    const [addressesUser, setAddressesUser] = useState([])
    const [updateAddress, setUpdateAddress] = useState(null)

    useEffect(() => getAllAddresses(), [getAllAddresses]);

    const getAllAddresses = useCallback(async () => {
        await get(`/address`)
        if (response.ok) {
            setAddressesUser(response.data.addresses)
        }
    }, [get, response])

    const style = {
        margin: '4rem auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const closeAll = () => {
        setShowForm(false)
        setUpdateAddress(null)
    }

    return (
        <>
            {loading ? <div style={style}><SyncLoader color='#303030' size={50} /></div> :
                <>
                    <BarAddress addressesUser={addressesUser} isLoggedIn={isLoggedIn} />
                    <AddressCards openForm={() => setShowForm(true)} addressesUser={addressesUser} setUpdateAddress={setUpdateAddress} getAllAddresses={getAllAddresses} />
                </>
            }
            {showForm &&
                <Modal onClose={closeAll}>
                    <AddressForm closeForm={closeAll} getAllAddresses={getAllAddresses} setUpdateAddress={setUpdateAddress} updateAddress={updateAddress} />
                </Modal>}
        </>
    )
}

export default AddressContainer