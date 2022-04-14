import useInput from 'hooks/useInput';
import styles from 'styles/ui/Form.module.css';
import { useAuth } from 'context/auth/authContext';

const Form = ({ showModal }) => {

    //CONTEXT
    const { logIn } = useAuth()

    //REGEX
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //EMAIL
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
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


    //FORMVALID?
    let formIsValid = false;
    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    //FORMHANDLER
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const email = e.target.email.value
        const password = e.target.password.value

        //SEND
        logIn({
            email,
            password
        })
        //RESET VALUES
        resetEmailInput()
        resetPasswordInput()

    }

    return (
        <form style={{ width: '100%' }} className={styles.form} onSubmit={formSubmissionHandler}>
            <input
                placeholder="Email*"
                type="email"
                id='email'
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                className={emailInputHasError ? styles.invalidInput : ''}
            />
            {emailInputHasError && <p className={styles.invalidText}>Debe ser un email valido.</p>}
            <input
                placeholder="Contraseña*"
                type="password"
                id="password"
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                className={passwordInputHasError ? styles.invalidInput : ''}
            />
            {passwordInputHasError && <p className={styles.invalidText}>La contraseña debe ser 8 caracteres, 1 en mayuscula, 1 en miniscula y 1 numero.</p>}
            <button disabled={!formIsValid}>INGRESAR</button>
            <button onClick={showModal}>¿OLVIDO CONTRASEÑA?</button>
        </form>
    )
}


export default Form