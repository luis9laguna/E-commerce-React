import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdEdit, MdDelete } from 'react-icons/md';
import styles from '@/styles/ui/AddressCards.module.scss'
import { getAddressMap } from 'utils/utils'
import useFetch from 'use-http';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const AddressCards = ({ openForm, addressesUser, setUpdateAddress, getAllAddresses }) => {

    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { put, del, response } = useFetch(`${process.env.url}`, options)


    const deleteAddress = id => {

        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Una vez eliminado, no seras capaz de recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                await del(`/address/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    )
                    //FETCH NEW DATA
                    getAllAddresses()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, intente mas tarde.'
                    })
                }
            }
        })
    }

    const editSelected = item => {
        setUpdateAddress(item)
        openForm()
    }

    const setDefault = async (id) => {

        await put(`/address/default/${id}`)

        if (response.ok) {
            toast.success('¡La dirección elegida ha sido cambiada exitosamente!')
            getAllAddresses()
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }

    return (
        <div className={styles.cardContainer}>

            {addressesUser?.map((info, i) => (
                <div className={`${styles.card} ${info.user.address === info._id ? styles.selectedAddress : ''}`} key={i}>
                    <span>{info.address.labelAddress}</span>
                    <span>{info.address.name}</span>
                    <span>{getAddressMap(info.address.region)}</span>
                    <span>{getAddressMap(info.address.provincia)}, {getAddressMap(info.address.comuna)}</span>
                    <span>{info.address.street}, {info.address.numStreet}</span>
                    <span>Dpto/Casa {info.address.infoHome}</span>
                    <span>{info.address.rut}</span>
                    <span>{info.address.phone}</span>
                    <span>{info.address.extraInfo}</span>
                    <div>
                        <button onClick={() => editSelected(info)}><MdEdit /></button>
                        <button onClick={() => deleteAddress(info._id)}><MdDelete /></button>
                    </div>
                    {info.user.address !== info._id && <button onClick={() => setDefault(info._id)}>Elegir</button>}
                </div>
            ))}

            {addressesUser.length < 3 &&
                <div className={`${styles.card} ${styles.cardCreate}`}>
                    <button onClick={openForm}><AiOutlinePlusCircle /></button>
                </div>
            }
        </div>
    )
}

export default AddressCards