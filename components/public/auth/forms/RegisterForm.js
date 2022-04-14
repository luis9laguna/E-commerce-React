import styles from '@/styles/ui/Form.module.css';
import useInput from 'hooks/useInput';
import { useAuth } from 'context/auth/authContext';

const RegisterForm = () => {

    //CONTEXT
    const { userRegister } = useAuth()

    //REGEX
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


    //NAME
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
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
    if (
        enteredNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid &&
        enteredPasswordConfirmIsValid
    ) {
        formIsValid = true;
    }

    //FORMHANDLER
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const values = {
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        //SEND
        userRegister(values)

        //RESET VALUES
        resetNameInput()
        resetLastNameInput()
        resetEmailInput()
        resetPasswordInput()
        resetPasswordConfirmInput()
    }

    return (
        <form className={styles.form} onSubmit={formSubmissionHandler}>
            <input
                placeholder="Nombre*"
                type="text"
                id="name"
                value={enteredName}
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                className={nameInputHasError ? styles.invalidInput : ''}
            />
            {nameInputHasError && <p className={styles.invalidText}>El nombre necesita tener al menos 3 caracteres.</p>}
            <input
                placeholder="Apellido*"
                type="text"
                id="lastname"
                value={enteredLastName}
                onChange={lastNameChangedHandler}
                onBlur={lastNameBlurHandler}
                className={lastNameInputHasError ? styles.invalidInput : ''}
            />
            {lastNameInputHasError && <p className={styles.invalidText}>El apellido necesita tener al menos 3 caracteres.</p>}
            <input
                placeholder="Email*"
                type="email"
                id="email"
                value={enteredEmail}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                className={emailInputHasError ? styles.invalidInput : ''}
            />
            {emailInputHasError && <p className={styles.invalidText}>Debe ser un correo valido.</p>}
            <input
                placeholder="Contraseña*"
                type="password"
                id="password"
                value={enteredPassword}
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                className={passwordInputHasError ? styles.invalidInput : ''}
            />
            {passwordInputHasError && <p className={styles.invalidText}>La contraseña debe tener al menos 8 caracteres, 1 mayuscula, 1 miniscula y 1 numero.</p>}
            <input
                placeholder="Confirmar contraseña*"
                type="password"
                id="passwordconfirm"
                value={enteredPasswordConfirm}
                onChange={passwordConfirmChangedHandler}
                onBlur={passwordConfirmBlurHandler}
                className={passwordConfirmInputHasError ? styles.invalidInput : ''}
            />
            {passwordConfirmInputHasError && <p className={styles.invalidText}>Contraseñas no son iguales</p>}
            <span>
                Al crear la cuenta, se acepta el procesamiento de tus datos personales en acuerdo con la <b>POLITICA DE PRIVACIDAD</b>
            </span>
            <button disabled={!formIsValid}>Crear</button>
        </form>
    )
}


export default RegisterForm