import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useFetch from 'use-http'
import useInput from "hooks/useInput"
import styles from '@/styles/ui/Form.module.css';

const ChangePasswordForm = () => {

    const router = useRouter()

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //REGEX
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //OLD PASSWORD
    const {
        value: enteredOldPassword,
        isValid: enteredOldPasswordIsValid,
        hasError: oldPasswordInputHasError,
        valueChangeHandler: oldPasswordChangedHandler,
        inputBlurHandler: oldPasswordBlurHandler,
        reset: resetOldPasswordInput
    } = useInput(value => regexPassword.test(value));

    //PASSWORD
    const {
        value: enteredNewPassword,
        isValid: enteredNewPasswordIsValid,
        hasError: newPasswordInputHasError,
        valueChangeHandler: newPasswordChangedHandler,
        inputBlurHandler: newPasswordBlurHandler,
        reset: resetNewPasswordInput
    } = useInput(value => regexPassword.test(value));


    //FORMVALID?
    let formIsValid = false;
    if (enteredOldPasswordIsValid && enteredNewPasswordIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const oldPassword = e.target.oldPassword.value
        const newPassword = e.target.newPassword.value

        //SEND
        await put(`/auth/change-password`, { oldPassword, newPassword })
        if (response.ok) {
            //MODAL
            Swal.fire(
                'Good job!', 'Your Password has been changed succesfully!', 'success'
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

        //RESET VALUES
        resetOldPasswordInput()
        resetNewPasswordInput()
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Change Password
            </h2>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
                <input
                    placeholder="Old Password*"
                    type="password"
                    id="oldPassword"
                    value={enteredOldPassword}
                    onChange={oldPasswordChangedHandler}
                    onBlur={oldPasswordBlurHandler}
                    className={styles.userInput}
                ></input>
                {oldPasswordInputHasError ? <p className={styles.invalidText}>Password must be at least 8 characters, 1 uppercase, 1 lowercase and 1 number.</p> : ''}
                <input
                    placeholder="New Password*"
                    type="password"
                    id="newPassword"
                    value={enteredNewPassword}
                    onChange={newPasswordChangedHandler}
                    onBlur={newPasswordBlurHandler}
                    className={styles.userInput}
                ></input>
                {newPasswordInputHasError ? <p className={styles.invalidText}>Password must be at least 8 characters, 1 uppercase, 1 lowercase and 1 number.</p> : ''}
                <button className={styles.userButton} disabled={!formIsValid}>Change Password</button>
            </form>
        </div>
    )
}


export default ChangePasswordForm