import styles from '@/styles/ui/Form.module.css';
import useInput from 'hooks/useInput';
import Swal from 'sweetalert2';
import Modal from '../../ui/Modal';

const ForgetForm = ({ onClose }) => {

    //REGEX
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //USEFETCH
    const { post, response, loading, error } = useFetch(`${process.env.url}`)

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
    const formSubmissionHandler = async (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;
        const email = e.target.email.value

        await post(`/auth/password-reset`, email)
        if (response.ok) {
            //MODAL
            Swal.fire(
                'Good job!', 'Check your email to continue with the process of recovering your account', 'success'
            )
            //REDIRECT
            router.push('/')

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message
            })
        }
        // onClose()
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

                <button disabled={!formIsValid}>SEND</button>
            </form>
        </Modal>
    )
}


export default ForgetForm