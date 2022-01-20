import { useState } from "react";
import useInput from 'hooks/use-input';
import styles from '@/styles/ui/Form.module.css';

export default function Form({ showModal }) {

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

        console.log("IS VALID");
        //RESET VALUES
        resetEmailInput()
        resetPasswordInput()
    }

    return (
        <form className={styles.form} onSubmit={formSubmissionHandler}>
            <input
                placeholder="Email*"
                type="email"
                id='email'
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                className={emailInputHasError ? styles.invalidInput : ''}
            />
            {emailInputHasError && <p className={styles.invalidText}>It must be a valid email.</p>}
            <input
                placeholder="Password*"
                type="password"
                id="password"
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                className={passwordInputHasError ? styles.invalidInput : ''}
            />
            {passwordInputHasError && <p className={styles.invalidText}>Password must be at least 8 characters, 1 uppercase, 1 lowercase and 1 number.</p>}
            <button disabled={!formIsValid}>LOGIN</button>
            <button onClick={showModal}>DONT REMEMBER THE PASSWORD?</button>
        </form>
    )
}