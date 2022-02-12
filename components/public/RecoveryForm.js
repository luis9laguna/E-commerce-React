import { useRouter } from 'next/router';
import useInput from 'hooks/useInput';
import { resetPassword } from 'helpers/api-util';
import styles from 'styles/ui/Form.module.css';



const recoveryForm = () => {


    const router = useRouter()
    const { token } = router.query

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
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const password = e.target.password.value

        //SEND
        resetPassword({ password }, token).then(resp => {
            if (resp.ok) {
                //MODAL
                Swal.fire(
                    'Good job!', 'Password changed successfully!', 'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resp.message,
                })
            }
        })
        //RESET VALUES
        resetPasswordInput()
    }

    return (
        <div className={styles.container} style={{ margin: '4rem 0' }}>
            <h2 className={styles.title}>Status Order</h2>
            <form style={{ width: '50%' }} className={styles.form} onSubmit={formSubmissionHandler}>
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
                <button disabled={!formIsValid}>CHANGE PASSWORD</button>
            </form>
        </div>
    )
};

export default recoveryForm;
