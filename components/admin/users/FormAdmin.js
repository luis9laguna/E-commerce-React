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
            const { name, surname, email } = userUpdate
            nameFillEdit(name)
            surnameFillEdit(surname)
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


    //SURNAME
    const {
        value: enteredSurName,
        isValid: enteredSurNameIsValid,
        hasError: surNameInputHasError,
        valueChangeHandler: surNameChangedHandler,
        inputBlurHandler: surNameBlurHandler,
        fillEdit: surnameFillEdit,
        reset: resetSurNameInput
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
            enteredSurNameIsValid &&
            enteredEmailIsValid &&
            enteredPasswordIsValid &&
            enteredPasswordConfirmIsValid
        ) formIsValid = true;
    } else {
        if (
            enteredNameIsValid &&
            enteredSurNameIsValid &&
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
        const surname = e.target.surname.value
        const email = e.target.email.value
        const password = e.target.password?.value


        //SEND
        if (userUpdate === null) {
            await post('/admin', {
                name,
                surname,
                email,
                password
            })
        } else {
            await put(`/admin/${userUpdate._id}`, {
                name,
                surname,
                email
            })
        }

        //MODAL
        if (response.ok) {
            Swal.fire(
                'Good job!',
                'The Admin has been created/edit successfully',
                'success'
            )
            //GET NEW DATA ADMINS
            getAdmins(1)
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
        resetSurNameInput()
        resetEmailInput()
        resetPasswordInput()
        resetPasswordConfirmInput()
    }

    return (
        <>
            <h1 className={styles.title}>{userUpdate === null ? 'CREATE' : 'EDIT'}</h1>
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
                <input
                    placeholder="Sur Name*"
                    type="text"
                    id="surname"
                    value={enteredSurName}
                    onChange={surNameChangedHandler}
                    onBlur={surNameBlurHandler}
                />
                {surNameInputHasError && <p className={styles.invalidText}>SurName need to has at least 3 characters</p>}
                <input
                    placeholder="Email*"
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                />
                {emailInputHasError && <p className={styles.invalidText}>It must be a valid email.</p>}

                {userUpdate === null && (
                    <>
                        <input
                            placeholder="Password*"
                            type="password"
                            id="password"
                            value={enteredPassword}
                            onChange={passwordChangedHandler}
                            onBlur={passwordBlurHandler}
                        />
                        {passwordInputHasError && <p className={styles.invalidText}>Password must be at least 8 characters, 1 uppercase, 1 lowercase and 1 number.</p>}
                        <input
                            placeholder="Confirm Password*"
                            type="password"
                            id="passwordconfirm"
                            value={enteredPasswordConfirm}
                            onChange={passwordConfirmChangedHandler}
                            onBlur={passwordConfirmBlurHandler}
                        />
                        {passwordConfirmInputHasError && <p className={styles.invalidText}>Password are not matching</p>}
                    </>
                )}

                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : (userUpdate === null ? 'CREATE' : 'EDIT')}
                </button>
                {error && <ErrorMessage />}
            </form>
        </>
    )
}

export default FormAdmin