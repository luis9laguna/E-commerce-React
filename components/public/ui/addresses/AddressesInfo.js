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
            title: '¿Estas seguro?',
            text: "Una vez elimnado, no seras capaz de recuperar la dirección",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'

        }).then(async result => {
            if (result.isConfirmed) {

                //DELETE CALL
                await del(`/address/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!', 'La dirección ha sido eliminada', 'success'
                    )
                    //DELETE ADDRESS FROM THE VIEW
                    setReFetchAddress(true)

                    //ACTION IF USER ISNT LOGGED
                    if (getUser) getUser()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Ha ocurrido un error, intente mas tarde."
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
                '¡Buen trabajo!', 'Tu dirección por defecto ha sido actualizada', 'success'
            )
            //SHOW DEFAULT ADDRESS ON THE VIEW
            setReFetchAddress(true)

            //ACTION IF USER ISNT LOGGED
            if (setAddressId) setAddressId(id)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde.',
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                {addresses.length >= 3 ?
                    <h2>No puedes crear mas de 3 direcciones</h2>
                    : <button onClick={buttonAddAddress}>Crear dirección</button>
                }
            </div>

            {error && <ErrorMessage />}
            {loading ? <Loading space={true} /> :
                <div className={styles.addressContainer}>
                    {addresses.length !== 0 ? addresses.map((address, i) => (
                        <div className={styles.address} key={i}>
                            <h3 className={styles.name}>{address.address.addressname}</h3>
                            <div className={styles.info}>
                                <div>Nombre: <span>{address.address.name}</span></div>
                                <div>Telefono: <span>{address.address.phone}</span></div>
                                <div>Rut: <span>{address.address.id}</span></div>
                                <div>Region: <span>{address.address.state}</span></div>
                                <div>Provincia: <span>{address.address.city}</span></div>
                                <div>Comuna: <span>{address.address.province}</span></div>
                                <div>Calle: <span>{address.address.street}, {address.address.numstreet}</span></div>
                                <div>Departamento/Bloque: <span>{address.address.apartment || 'none'}</span></div>
                            </div>
                            <hr />
                            <div className={styles.containerDefault}>
                                {address._id === userAddress
                                    ? <div className={styles.default}><CheckCircleOutlined />Dirección por defecto.</div>
                                    : <button onClick={() => handlerMakeDefault(address._id)}>Defecto</button>}
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
                        <h1>No has creado ninguna dirección aun.</h1>
                    }
                </div>
            }
        </div>
    )
}


export default AddressesInfo