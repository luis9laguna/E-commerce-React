import { useEffect } from 'react'
import useFetch from 'use-http'
import Swal from 'sweetalert2'
import useInput from 'hooks/useInput'
import styles from '@/styles/ui/Form.module.css'

export default function FormCategory({ inventoryUpdate, setInForm, getCategories }) {


    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}/category`, options)

    //FILL FORM EDIT
    useEffect(() => {
        if (inventoryUpdate !== null) {
            const { name } = inventoryUpdate
            nameFillEdit(name)
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
    if (enteredNameIsValid) formIsValid = true;


    //FORMHANDLER
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = enteredName

        //SEND
        if (inventoryUpdate === null) {
            await post({ name })
        } else {
            await put(
                inventoryUpdate._id,
                { name }
            )
        }

        if (response.ok) {
            Swal.fire(
                'Good job!',
                'The category has been created/edit successfully',
                'success'
            )
            getCategories()
            setInForm()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message
            })
        }


        //RESET VALUES
        resetNameInput()
    }

    return (
        <>
            <h1 className={styles.title}>{inventoryUpdate === null ? 'CREATE' : 'EDIT'}</h1>
            <form className={styles.form} onSubmit={formSubmissionHandler} style={{ minWidth: '280px' }}>
                <input
                    placeholder="Name*"
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                />
                {nameInputHasError && <p className={styles.invalidText}>Name need to has at least 3 characters</p>}
                <button disabled={!formIsValid}>{inventoryUpdate === null ? 'CREATE' : 'EDIT'}</button>
            </form>
        </>
    )
}

