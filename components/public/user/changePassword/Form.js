import styles from "./Form.module.css"

export default function Form() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Change Password
            </h2>
            <form className={styles.form}>
                <div>
                    <label htmlFor='oldPassword'>Old Password</label>
                    <input type='password' name='oldPassword' />
                </div>
                <div>
                    <label htmlFor='newPassword'>New Password</label>
                    <input type='password' name='newPassword' />
                </div>
                <button>Change Password</button>
            </form>
        </div>
    )
}
