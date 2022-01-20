import styles from '@/styles/ui/Form.module.css';
import useInput from 'hooks/use-input';
import Modal from '../../ui/Modal';

export default function ForgetForm({ onClose }) {

    //REGEX
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //EMAIL
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => regexEmail.test(value));

    //FORMVALID?
    let formIsValid = false;
    if (enteredEmailIsValid) {
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
    }

    return (
        <Modal onClose={onClose}>
            <h2 className={styles.title}>FORGOT PASSWORD</h2>
            <form className={styles.form} style={{ boxShadow: 'initial', minWidth: '250px' }} onSubmit={formSubmissionHandler}>
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

                <button disabled={!formIsValid} onClick={onClose}>SEND</button>
            </form>
        </Modal>
    )
}
