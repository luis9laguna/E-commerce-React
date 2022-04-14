import { useEffect } from 'react';
import useFetch from 'use-http'
import useInput from 'hooks/useInput'
import { useAuth } from 'context/auth/authContext';
import Swal from 'sweetalert2';
import styles from '@/styles/ui/Form.module.css';
import Loading from '../../ui/Loading';
import ErrorMessage from '../../ui/ErrorMessage';


const UserDataForm = ({ userInfo }) => {

    const { updateUser } = useAuth()

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //FILL FORM EDIT
    useEffect(() => {
        if (userInfo !== '') {
            const { name, lastname } = userInfo
            nameFillEdit(name)
            lastNameFillEdit(lastname)
        }
    }, [userInfo]);

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

    //LASTNAME
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        fillEdit: lastNameFillEdit,
        reset: resetLastNameInput
    } = useInput(value => value.trim().length >= 3)

    //FORMVALID?
    let formIsValid = false;
    if (enteredNameIsValid && enteredLastNameIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = enteredName
        const lastname = enteredLastName

        //SEND
        const infoUpdatedUser = await put(`/user/update`, { name, lastname })
        if (response.ok) {
            updateUser(infoUpdatedUser.user.name)
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡Actualización completada!', 'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, por favor intente mas tarde.'
            })
        }
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Informacion del usuario
            </h2>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
                <label className={styles.labelInfo} htmlFor='name'>Nombre</label>
                <input
                    name='name'
                    placeholder="Nombre"
                    value={enteredName}
                    type="text"
                    id="name"
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    className={styles.userInput}
                />
                {nameInputHasError ? <p className={styles.invalidText}>El nombre necesita tener al menos 3 caracteres</p> : ''}

                <label className={styles.labelInfo} htmlFor='lastname'>Apellido</label>
                <input
                    name='lastname'
                    placeholder="Apellido"
                    value={enteredLastName}
                    type="text"
                    id="lastname"
                    onChange={lastNameChangedHandler}
                    onBlur={lastNameBlurHandler}
                    className={styles.userInput}
                />
                {lastNameInputHasError ? <p className={styles.invalidText}>El apellido necesita tener al menos 3 caracteres</p> : ''}

                <label className={styles.labelInfo} htmlFor='email'>Email (<span>{userInfo.email}</span>)</label>

                <button className={styles.userButton} disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : 'Guardar'}
                </button>
                {error && <ErrorMessage />}
            </form >
        </div >
    )
}


export default UserDataForm