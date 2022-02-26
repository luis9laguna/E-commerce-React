import { useEffect } from 'react';
import useFetch from 'use-http'
import useInput from 'hooks/useInput'
import { useAuth } from 'context/auth/authContext';
import Swal from 'sweetalert2';
import styles from '@/styles/ui/Form.module.css';


const UserDataForm = ({ userInfo }) => {

    const { updateUser } = useAuth()

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //FILL FORM EDIT
    useEffect(() => {
        if (userInfo !== '') {
            const { name, surname } = userInfo
            nameFillEdit(name)
            surnameFillEdit(surname)
        }
    }, [userInfo]);

    //NAME
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        fillEdit: nameFillEdit,
        reset: resetNameInput
    } = useInput(value => value.trim().length >= 3)

    //SURNAME
    const {
        value: enteredSurName,
        isValid: enteredSurNameIsValid,
        hasError: surNameInputHasError,
        valueChangeHandler: surNameChangedHandler,
        inputBlurHandler: surNameBlurHandler,
        fillEdit: surnameFillEdit,
        reset: resetSurNameInput
    } = useInput(value => value.trim().length >= 3)


    //FORMVALID?
    let formIsValid = false;
    if (enteredNameIsValid && enteredSurNameIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = e.target.name.value
        const surname = e.target.surname.value

        //SEND
        const infoUpdatedUser = await put(`/user/update`, { name, surname })
        if (response.ok) {
            updateUser(infoUpdatedUser.user.name)
            //MODAL
            Swal.fire(
                'Good job!', 'Update completed!', 'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message
            })
        }
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                User Information
            </h2>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
                <label className={styles.labelInfo} htmlFor='name'>Name</label>
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

                <label className={styles.labelInfo} htmlFor='surName'>Sur Name</label>
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


export default UserDataForm