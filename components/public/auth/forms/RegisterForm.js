import styles from '@/styles/ui/Form.module.css';
import useInput from 'hooks/useInput';
import { useAuth } from 'context/auth/authContext';

export default function RegisterForm() {

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


    //SURNAME
    const {
        value: enteredSurName,
        isValid: enteredSurNameIsValid,
        hasError: surNameInputHasError,
        valueChangeHandler: surNameChangedHandler,
        inputBlurHandler: surNameBlurHandler,
        reset: resetSurNameInput
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
        enteredSurNameIsValid &&
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
        const name = e.target.name.value
        const surname = e.target.surname.value
        const email = e.target.email.value
        const password = e.target.password.value

        //SEND
        userRegister({
            name,
            surname,
            email,
            password
        })

        //RESET VALUES
        resetNameInput()
        resetSurNameInput()
        resetEmailInput()
        resetPasswordInput()
        resetPasswordConfirmInput()
    }

    return (
        <form className={styles.form} onSubmit={formSubmissionHandler}>
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
            <span>
                By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button disabled={!formIsValid}>Create</button>
        </form>
    )
}