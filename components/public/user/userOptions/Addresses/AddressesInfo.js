import { useEffect, useState } from 'react';
import { deleteAddress, getAddresses, makeAddressDefault } from 'helpers/api-util';
import styles from '@/styles/user/Adresses.module.css'
import { Check, CheckCircleOutlined, EditOutlined, RemoveCircleOutlined } from '@material-ui/icons'
import Swal from 'sweetalert2';

export default function AddressesInfo({ showModal, setAddressUpdate, reFetchAddress, setReFetchAddress }) {

    const [addresses, setAddresses] = useState([])
    const [userAddress, setUserAddress] = useState('')

    //GET ADDRESS FROM START
    useEffect(async () => {
        await getAddresses().then(resp => {
            if (resp.ok) {
                setAddresses(resp.addresses)
                setUserAddress(resp.addresses[0].user.address)
            }
        })
    }, [])

    //GET UPDATED INFO OF ADDRESS
    useEffect(async () => {
        if (reFetchAddress) {
            await getAddresses().then(resp => {
                if (resp.ok) {
                    setAddresses(resp.addresses)
                    setUserAddress(resp.addresses[0].user.address)
                }
            })
            setReFetchAddress(false)
        }
    }, [reFetchAddress])


    //HANDLERS EDIT AND DELETE
    const handlerEdit = (id) => {
        showModal()
        setAddressUpdate(id)
    }

    const handlerDelete = (id) => {

        //MODAL CONFIRMATION
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this Address!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {

                //DELETE CALL
                deleteAddress(id).then(resp => {

                    if (resp.ok) {
                        Swal.fire(
                            'Deleted!',
                            'The Address has been deleted.',
                            'success'
                        )

                        //DELETE ADDRESS FROM THE VIEW
                        const newAddresses = addresses.filter(address => address._id !== id)
                        setAddresses(newAddresses)

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: resp.message
                        })
                    }

                })
            }
        })
    }

    //ADD ADDRESS BUTTON
    const buttonAddAddress = () => {
        setAddressUpdate('')
        showModal()
    }

    //BUTTON TO MAKE ADDRESS THE DEFAULT ONE
    const handlerMakeDefault = (id) => {
        makeAddressDefault(id).then(resp => {
            if (resp.ok) {
                //MODAL
                Swal.fire(
                    'Good job!', 'Your default address has been updated', 'success'
                )
                setUserAddress(id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'there was an error try again later',
                })
            }
        })

    }


    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                {addresses.length >= 4 ?
                    <h2>You can't create more than 4 addresses</h2>
                    :
                    <button onClick={buttonAddAddress}>Add address</button>
                }
            </div>
            <div className={styles.addressContainer}>

                {addresses.map((address, i) => (
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
                ))}

            </div>
        </div>
    )
}
