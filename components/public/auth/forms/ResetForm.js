import styles from '@/styles/ui/Form.module.css';


export default function Form() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>RESET PASSWORD</h2>
            <form className={styles.form}>
                <input placeholder="password"></input>
                <input placeholder="confirm password"></input>
                <button>CHANGE PASSWORD</button>
                <span>Wait ... to send another email</span>
            </form>
        </div>
    )
}
