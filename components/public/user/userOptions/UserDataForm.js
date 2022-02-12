import useInput from 'hooks/useInput'
import { useRouter } from 'next/router';
import { useAuth } from 'context/auth/authContext';
import { updateUserInfo } from 'helpers/api-util';
import Swal from 'sweetalert2';
import styles from '@/styles/ui/Form.module.css';


export default function UserDataForm({ userInfo }) {

    const { updateUser } = useAuth()
    const router = useRouter()

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


    //FORMVALID?
    let formIsValid = false;
    if (enteredNameIsValid && enteredSurNameIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = e.target.name.value
        const surname = e.target.surname.value

        //SEND
        updateUserInfo({
            name,
            surname
        }).then(resp => {
            updateUser(resp.name)
            //MODAL
            Swal.fire(
                'Good job!', 'Your registration is completed!', 'success'
            )
            //REDIRECT
            router.push('/')
        })

        //RESET VALUES
        resetNameInput()
        resetSurNameInput()
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                User Information
            </h2>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
                <label className={styles.labelInfo} htmlFor='name'>Name (<span>{userInfo.name}</span>)</label>
                <input
                    name='name'
                    placeholder="Name"
                    value={enteredName}
                    type="text"
                    id="name"
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                    className={styles.userInput}
                />
                {nameInputHasError ? <p className={styles.invalidText}>Name need to has at least 3 characters</p> : ''}

                <label className={styles.labelInfo} htmlFor='surName'>Sur Name (<span>{userInfo.surname}</span>)</label>
                <input
                    name='surname'
                    placeholder="SurName"
                    value={enteredSurName}
                    type="text"
                    id="surname"
                    onChange={surNameChangedHandler}
                    onBlur={surNameBlurHandler}
                    className={styles.userInput}
                />
                {surNameInputHasError ? <p className={styles.invalidText}>SurName need to has at least 3 characters</p> : ''}

                <label className={styles.labelInfo} htmlFor='email'>Email (<span>{userInfo.email}</span>)</label>

                <button className={styles.userButton} disabled={!formIsValid}>Save</button>
            </form >
        </div >
    )
}
