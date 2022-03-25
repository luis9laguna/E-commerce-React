import { useEffect, useState } from 'react';
import useFetch from 'use-http'
import styles from '@/styles/user/Adresses.module.css'
import { CheckCircleOutlined, EditOutlined, RemoveCircleOutlined } from '@material-ui/icons'
import Swal from 'sweetalert2';
import Loading from '@/components/public/ui/Loading';
import ErrorMessage from '@/components/public/ui/ErrorMessage';

const AddressesInfo = ({ showModal, setAddressUpdate, reFetchAddress, setReFetchAddress, setAddressId, getUser }) => {

    const [addresses, setAddresses] = useState([])
    const [userAddress, setUserAddress] = useState('')

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, del, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    const getUserAddress = async () => {
        const userResp = await get(`/user`)
        if (response.ok) setUserAddress(userResp.user.address)
    }

    const getAllAddresses = async () => {
        const allAddresses = await get(`/address`)
        if (response.ok) {
            setAddresses(allAddresses.addresses)
            getUserAddress()
        }
    }

    //GET ADDRESS FROM START
    useEffect(() => { getAllAddresses() }, [])

    //GET UPDATED INFO OF ADDRESS
    useEffect(() => {
        if (reFetchAddress) {
            getAllAddresses()
            setReFetchAddress(false)
        }
    }, [reFetchAddress])

    //HANDLERS EDIT AND DELETE
    const handlerEdit = (id) => {
        showModal()
        setAddressUpdate(id)
    }

    const handlerDelete = id => {

        //MODAL CONFIRMATION
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this Address!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then(async result => {
            if (result.isConfirmed) {

                //DELETE CALL
                await del(`/address/${id}`)
                if (response.ok) {
                    Swal.fire(
                        'Deleted!', 'The Address has been deleted.', 'success'
                    )
                    //DELETE ADDRESS FROM THE VIEW
                    setReFetchAddress(true)

                    //ACTION IF USER ISNT LOGGED
                    if (getUser) getUser()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.message
                    })
                }
            }
        })
    }

    //ADD ADDRESS BUTTON
    const buttonAddAddress = () => {
        setAddressUpdate('')
        showModal()
    }

    //BUTTON TO MAKE ADDRESS THE DEFAULT ONE
    const handlerMakeDefault = async id => {
        await put(`/address/default/${id}`)
        if (response.ok) {
            Swal.fire(
                'Good job!', 'Your default address has been updated', 'success'
            )
            //SHOW DEFAULT ADDRESS ON THE VIEW
            setReFetchAddress(true)

            //ACTION IF USER ISNT LOGGED
            if (setAddressId) setAddressId(id)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'there was an error try again later',
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                {addresses.length >= 3 ?
                    <h2>You can't create more than 3 addresses</h2>
                    : <button onClick={buttonAddAddress}>Add address</button>
                }
            </div>

            {error && <ErrorMessage />}
            {loading ? <Loading space={true} /> :
                <div className={styles.addressContainer}>
                    {addresses.length !== 0 ? addresses.map((address, i) => (
                        <div className={styles.address} key={i}>
                            <h3 className={styles.name}>{address.address.addressname}</h3>
                            <div className={styles.info}>
                                <div>Name: <span>{address.address.name}</span></div>
                                <div>Phone: <span>{address.address.phone}</span></div>
                                <div>ID: <span>{address.address.id}</span></div>
                                <div>State: <span>{address.address.state}</span></div>
                                <div>City: <span>{address.address.city}</span></div>
                                <div>Province: <span>{address.address.province}</span></div>
                                <div>Street: <span>{address.address.street}, {address.address.numstreet}</span></div>
                                <div>Apartment: <span>{address.address.apartment || 'none'}</span></div>
                            </div>
                            <hr />
                            <div className={styles.containerDefault}>
                                {address._id === userAddress
                                    ? <div className={styles.default}><CheckCircleOutlined /> Default Address</div>
                                    : <button onClick={() => handlerMakeDefault(address._id)}>Make Default</button>}
                            </div>
                            <div className={styles.options}>
                                <button onClick={() => handlerEdit(address._id)}>
                                    <EditOutlined />
                                </button>
                                <button onClick={() => handlerDelete(address._id)}>
                                    <RemoveCircleOutlined />
                                </button>
                            </div>
                        </div>
                    ))
                        :
                        <h1>You haven't created any address yet</h1>
                    }
                </div>
            }
        </div>
    )
}


export default AddressesInfo