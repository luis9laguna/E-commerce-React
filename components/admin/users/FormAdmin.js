import { useEffect } from 'react'
import Swal from 'sweetalert2'
import useInput from 'hooks/useInput'
import styles from '@/styles/ui/Form.module.css'
import useFetch from 'use-http'
import Loading from '@/components/public/ui/Loading'
import ErrorMessage from '@/components/public/ui/ErrorMessage'

const FormAdmin = ({ getAdmins, setInForm, userUpdate }) => {

    //REGEX FOR EMAIL
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //USEFETCH
    const options = { headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}`, options)


    //FILL FORM EDIT
    useEffect(() => {
        if (userUpdate !== null) {
            const { name, lastname, email } = userUpdate
            nameFillEdit(name)
            lastnameFillEdit(lastname)
            emailFillEdit(email)
        }
    }, [userUpdate]);

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
        reset: resetLastNameInput
    } = useInput(value => value.trim().length >= 3)

    //EMAIL
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        fillEdit: emailFillEdit,
        reset: resetEmailInput
    } = useInput(value => regexEmail.test(value));

    //PASSWORD
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(value => regexPassword.test(value));

    //CONFIRM PASSWORD
    const {
        value: enteredPasswordConfirm,
        isValid: enteredPasswordConfirmIsValid,
        hasError: passwordConfirmInputHasError,
        valueChangeHandler: passwordConfirmChangedHandler,
        inputBlurHandler: passwordConfirmBlurHandler,
        reset: resetPasswordConfirmInput
    } = useInput(value => value === enteredPassword);


    //FORMVALID?
    let formIsValid = false;
    if (userUpdate === null) {

        if (
            enteredNameIsValid &&
            enteredLastNameIsValid &&
            enteredEmailIsValid &&
            enteredPasswordIsValid &&
            enteredPasswordConfirmIsValid
        ) formIsValid = true;
    } else {
        if (
            enteredNameIsValid &&
            enteredLastNameIsValid &&
            enteredEmailIsValid
        ) formIsValid = true;
    }


    //FORMHANDLER
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = e.target.name.value
        const lastname = e.target.lastname.value
        const email = e.target.email.value
        const password = e.target.password?.value


        //SEND
        if (userUpdate === null) {
            await post('/admin', {
                name,
                lastname,
                email,
                password
            })
        } else {
            await put(`/admin/${userUpdate._id}`, {
                name,
                lastname,
                email
            })
        }

        //MODAL
        if (response.ok) {
            Swal.fire(
                '¡Excelente!',
                'El admin ha sido creado/editado exitosamente.',
                'success'
            )
            //GET NEW DATA ADMINS
            getAdmins(1)
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
        resetLastNameInput()
        resetEmailInput()
        resetPasswordInput()
        resetPasswordConfirmInput()
    }

    return (
        <>
            <h1 className={styles.title}>{userUpdate === null ? 'CREAR' : 'EDITAR'}</h1>
            <form className={styles.form} onSubmit={formSubmissionHandler} style={{ minWidth: '280px' }}>
                <input
                    placeholder="Nombre*"
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    className={emailInputHasError ? styles.invalidInput : ''}
                />
                {nameInputHasError && <p className={styles.invalidText}>El nombre debe tener al menos 3 caracteres.</p>}
                <input
                    placeholder="Apellido*"
                    type="text"
                    id="lastname"
                    value={enteredLastName}
                    onChange={lastNameChangedHandler}
                    onBlur={lastNameBlurHandler}
                    className={lastNameInputHasError ? styles.invalidInput : ''}
                />
                {lastNameInputHasError && <p className={styles.invalidText}>El apellido debe tener al menos 3 caracteres.</p>}
                <input
                    placeholder="Email*"
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    className={emailInputHasError ? styles.invalidInput : ''}
                />
                {emailInputHasError && <p className={styles.invalidText}>Debe ser un email valido.</p>}

                {userUpdate === null && (
                    <>
                        <input
                            placeholder="Contraseña*"
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangedHandler}
                            onBlur={passwordBlurHandler}
                            className={emailInputHasError ? styles.invalidInput : ''}
                        />
                        {passwordInputHasError && <p className={styles.invalidText}>El pasaporte debe ser 8 caracteres, 1 en mayuscula, 1 en miniscula y 1 numero.</p>}
                        <input
                            placeholder="Confirmar Contraseña*"
                            type="password"
                            id="passwordconfirm"
                            value={enteredPasswordConfirm}
                            onChange={passwordConfirmChangedHandler}
                            onBlur={passwordConfirmBlurHandler}
                            className={emailInputHasError ? styles.invalidInput : ''}
                        />
                        {passwordConfirmInputHasError && <p className={styles.invalidText}>Las contraseñas no coinciden.</p>}
                    </>
                )}

                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : (userUpdate === null ? 'CREAR' : 'EDITAR')}
                </button>
                {error && <ErrorMessage />}
            </form>
        </>
    )
}

export default FormAdmin