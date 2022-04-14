import { useRouter } from 'next/router';
import useInput from 'hooks/useInput';
import useFetch from 'use-http'
import styles from 'styles/ui/Form.module.css';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

const RecoveryForm = () => {

    const router = useRouter()
    const { token } = router.query

    //USEFETCH
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //REGEX
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //PASSWORD
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(value => regexPassword.test(value));

    //FORMVALID?
    let formIsValid = false;
    if (enteredPasswordIsValid) formIsValid = true;


    //FORMHANDLER
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const password = e.target.password.value

        //SEND
        await put(`/auth/password-reset/${token}`, { password })
        if (response) {
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡La contraseña ha sido cambiada exitosamente!', 'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde.'
            })
        }

        //RESET VALUES
        resetPasswordInput()
    }

    return (
        <div className={styles.container} style={{ margin: '4rem 0' }}>
            <h2 className={styles.title}>Status Order</h2>
            <form style={{ width: '50%' }} className={styles.form} onSubmit={formSubmissionHandler}>
                <input
                    placeholder="Contraseña*"
                    type="password"
                    id="password"
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPassword}
                    className={passwordInputHasError ? styles.invalidInput : ''}
                />
                {passwordInputHasError && <p className={styles.invalidText}>La contraseña debe tener al menos 8 caracteres, 1 mayuscula, 1 miniscula y 1 numero.</p>}
                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : 'CAMBIAR CONTRASEÑA'}
                </button>
                {error && <ErrorMessage />}
            </form>
        </div>
    )
};

export default RecoveryForm;
