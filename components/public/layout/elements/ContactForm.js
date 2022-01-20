import styles from '@/styles/ui/Form.module.css'
import useInput from 'hooks/use-input'
import Modal from '../../ui/Modal'

export default function ContactForm({ onClose }) {

    //REGEX FOR EMAIL
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //NAME
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim().length >= 3)

    //EMAIL
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => regexEmail.test(value))

    //TEXTAREA MESSAGE
    const {
        value: enteredText,
        valueChangeHandler: textChangedHandler,
        reset: resetTextInput
    } = useInput(value => value.trim().length >= 0)


    //FORMVALID?
    let formIsValid = false;
    if (enteredEmailIsValid && enteredNameIsValid) {
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
        resetNameInput()
        resetTextInput()
    }

    return (
        <Modal onClose={onClose}>
            <h2 className={styles.title}>CONTACT</h2>
            <form className={styles.form} style={{ boxShadow: 'initial', minWidth: '250px', width: "50%" }} onSubmit={formSubmissionHandler}>
                <input
                    placeholder="Name*"
                    type="text"
                    id="name"
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                    className={nameInputHasError ? styles.invalidInput : ''}
                />
                {nameInputHasError && <p className={styles.invalidText}>Name need to has at least 3 characters</p>}

                <input
                    placeholder="Email*"
                    type="email"
                    id="name"
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                    className={emailInputHasError ? styles.invalidInput : ''}
                />
                {emailInputHasError && <p className={styles.invalidText}>It must be a valid email.</p>}

                <label htmlFor="textarea" style={{ fontSize: "2rem", margin: "1rem" }}>Message</label>
                <textarea
                    name="textarea"
                    id="textarea"
                    placeholder="Write here to message(it's optional)."
                    onChange={textChangedHandler}
                    value={enteredText}
                />
                <button disabled={!formIsValid} onClick={onClose}>SEND</button>
            </form>
        </Modal>
    )
}
