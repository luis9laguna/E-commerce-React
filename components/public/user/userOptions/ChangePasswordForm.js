import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useFetch from 'use-http'
import useInput from "hooks/useInput"
import styles from '@/styles/ui/Form.module.css';
import Loading from "../../ui/Loading";
import ErrorMessage from "../../ui/ErrorMessage";

const ChangePasswordForm = () => {

    const router = useRouter()

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //REGEX
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //OLD PASSWORD
    const {
        value: enteredOldPassword,
        isValid: enteredOldPasswordIsValid,
        hasError: oldPasswordInputHasError,
        valueChangeHandler: oldPasswordChangedHandler,
        inputBlurHandler: oldPasswordBlurHandler,
        reset: resetOldPasswordInput
    } = useInput(value => regexPassword.test(value));

    //PASSWORD
    const {
        value: enteredNewPassword,
        isValid: enteredNewPasswordIsValid,
        hasError: newPasswordInputHasError,
        valueChangeHandler: newPasswordChangedHandler,
        inputBlurHandler: newPasswordBlurHandler,
        reset: resetNewPasswordInput
    } = useInput(value => regexPassword.test(value));


    //FORMVALID?
    let formIsValid = false;
    if (enteredOldPasswordIsValid && enteredNewPasswordIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const oldPassword = e.target.oldPassword.value
        const newPassword = e.target.newPassword.value

        //SEND
        await put(`/auth/change-password`, { oldPassword, newPassword })
        if (response.ok) {
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡La contraseña ha sido cambiada exitosamente!', 'success'
            )
            //REDIRECT
            router.push('/')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde.'
            })
        }

        //RESET VALUES
        resetOldPasswordInput()
        resetNewPasswordInput()
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Cambiar contraseña
            </h2>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
                <input
                    placeholder="Antigua Contraseña*"
                    type="password"
                    id="oldPassword"
                    value={enteredOldPassword}
                    onChange={oldPasswordChangedHandler}
                    onBlur={oldPasswordBlurHandler}
                    className={styles.userInput}
                ></input>
                {oldPasswordInputHasError ? <p className={styles.invalidText}>La contraseña debe tener al menos 8 caracteres, 1 mayuscula, 1 miniscula y 1 numero.</p> : ''}
                <input
                    placeholder="Nueva Contraseña*"
                    type="password"
                    id="newPassword"
                    value={enteredNewPassword}
                    onChange={newPasswordChangedHandler}
                    onBlur={newPasswordBlurHandler}
                    className={styles.userInput}
                ></input>
                {newPasswordInputHasError ? <p className={styles.invalidText}>La contraseña debe tener al menos 8 caracteres, 1 mayuscula, 1 miniscula y 1 numero.</p> : ''}
                <button className={styles.userButton} disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : 'Cambiar Contraseña'}
                </button>
                {error && <ErrorMessage />}
            </form>
        </div>
    )
}


export default ChangePasswordForm