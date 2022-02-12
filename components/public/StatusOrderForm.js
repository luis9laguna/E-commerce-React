import Swal from 'sweetalert2';
import { getStatusOrder } from 'helpers/api-util';
import useInput from 'hooks/useInput';
import styles from '@/styles/ui/Form.module.css';

export default function StatusOrderForm({ showModal, setDetailOrder }) {

    const {
        value: enteredCode,
        isValid: enteredCodeIsValid,
        hasError: codeInputHasError,
        valueChangeHandler: codeChangedHandler,
        inputBlurHandler: codeBlurHandler,
        reset: resetCodeInput
    } = useInput(value => value.trim().length >= 36);

    //FORMVALID?
    let formIsValid = false;
    if (enteredCodeIsValid) formIsValid = true;


    //FORMHANDLER
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const code = e.target.code.value

        //SEND
        getStatusOrder({ code }).then(resp => {
            if (resp.ok) {
                //MODAL
                setDetailOrder(resp.order)
                showModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resp.message,
                })
            }
        })
        //RESET VALUES
        resetCodeInput()
    }

    return (
        <div className={styles.container} style={{ margin: '4rem 0' }}>
            <h2 className={styles.title}>Status Order</h2>
            <form className={styles.form} style={{ width: '50%' }} onSubmit={formSubmissionHandler}>
                <input
                    placeholder="Code Package*"
                    type="text"
                    id="code"
                    value={enteredCode}
                    onChange={codeChangedHandler}
                    onBlur={codeBlurHandler}
                />
                {codeInputHasError && <p className={styles.invalidText}>Code has to be of at least 36 characters</p>}
                <button disabled={!formIsValid}>Look Status</button>
            </form>
        </div>
    )
}
