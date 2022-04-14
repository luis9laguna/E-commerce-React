import styles from '@/styles/ui/Form.module.css';
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import useInput from 'hooks/useInput';
import Swal from 'sweetalert2';
import ErrorMessage from '../../ui/ErrorMessage';
import Loading from '../../ui/Loading';
import Modal from '../../ui/Modal';

const ForgetForm = ({ onClose }) => {

    const router = useRouter()

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
        console.log(email)

        await post(`/auth/password-reset`, { email })
        if (response.ok) {
            //MODAL
            Swal.fire(
                'Buen trabajo!', 'Dirigite a tu correo para progresar con la recuperacion de tu cuenta.', 'success'
            )
            //REDIRECT
            router.push('/')

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha habido un error intente mas tarde.'
            })
        }
        onClose()
        //RESET VALUES
        resetEmailInput()
    }

    return (
        <Modal onClose={onClose}>
            <h2 className={styles.title}>RECUPERAR CUENTA</h2>
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
                {emailInputHasError && <p className={styles.invalidText}>Debe ser un email valido.</p>}

                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : 'SEND'}
                </button>
                {error && <ErrorMessage />}
            </form>
        </Modal>
    )
}


export default ForgetForm