import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Swal from 'sweetalert2'
import useInput from 'hooks/useInput'
import React from 'react'
import styles from '@/styles/ui/Form.module.css'
import Upload from '@/components/public/ui/upload'
import Loading from '@/components/public/ui/Loading'
import ErrorMessage from '@/components/public/ui/ErrorMessage'

export default function FormCategory({ inventoryUpdate, setInForm, getCategories }) {

    //IMAGES STATE
    const [images, setImages] = useState([])

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //FILL FORM EDIT
    useEffect(() => {
        if (inventoryUpdate !== null) {
            const { name, image } = inventoryUpdate
            nameFillEdit(name)
            setImages([image])
        }
    }, [inventoryUpdate]);

    //NAME
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        fillEdit: nameFillEdit,
        reset: resetNameInput
    } = useInput(value => value.trim().length >= 3)


    //FORMVALID?
    let formIsValid = false;
    if (enteredNameIsValid && images.length > 0) formIsValid = true;

    const dataImages = () => {
        let arrayImages = []
        Array.from(images).map(image => (
            arrayImages.push(image.data)
        ))
        return arrayImages
    }


    //FORMHANDLER
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;


        //VALUES
        const form = {
            images,
            name: enteredName
        }

        //SEND
        if (inventoryUpdate === null) await post('/category', form)
        else await put(`/category/${inventoryUpdate._id}`, form)

        //MODAL
        if (response.ok) {
            Swal.fire(
                '¡Excelente!',
                'La categoria ha sido creada/editada exitosamente.',
                'success'
            )
            getCategories()
            setInForm()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde'
            })
        }


        //RESET VALUES
        resetNameInput()
        setImages([])
    }


    return (
        <>
            <h1 className={styles.title}>{inventoryUpdate === null ? 'CREAR' : 'EDITAR'}</h1>
            <form className={styles.form} onSubmit={formSubmissionHandler} style={{ minWidth: '280px' }}>
                <input
                    placeholder="Nombre*"
                    type="text"
                    id="name"
                    name="name"
                    value={enteredName}
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    className={emailInputHasError ? styles.invalidInput : ''}
                />
                {nameInputHasError && <p className={styles.invalidText}>El nombre debe tener al menos 3 caracteres.</p>}
                <Upload images={images} setImages={setImages} limit={1} />
                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : (inventoryUpdate === null ? 'CREAR' : 'EDITAR')}
                </button>
                {error && <ErrorMessage />}
            </form>
        </>
    )
}

