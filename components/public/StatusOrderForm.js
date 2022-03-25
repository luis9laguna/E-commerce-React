import Swal from 'sweetalert2';
import useFetch from 'use-http'
import useInput from 'hooks/useInput';
import styles from '@/styles/ui/Form.module.css';
import Loading from './ui/Loading';
import ErrorMessage from './ui/ErrorMessage';

const StatusOrderForm = ({ showModal, setDetailOrder }) => {

    //USEFETCH
    const { post, response, loading, error } = useFetch(`${process.env.url}`)

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
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const code = e.target.code.value

        //SEND
        const getDetailOrder = await post(`/order/code/status`, { code })
        if (response.ok) {
            //MODAL
            setDetailOrder(getDetailOrder.order)
            showModal()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            })
        }
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
                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : 'Look Status'}
                </button>
                {error && <ErrorMessage />}
            </form>
        </div>
    )
}


export default StatusOrderForm