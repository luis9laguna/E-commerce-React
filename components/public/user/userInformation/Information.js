import styles from './Information.module.css'

export default function Information() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                User Information
            </h2>
            <form className={styles.form}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input name='name' />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input name='lastName' />
                </div>
                <div>
                    <label htmlFor='id'>Id</label>
                    <input name='id' />
                </div>
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input name='phone' />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input name='email' />
                </div>

                <button>Save</button>
            </form>
        </div>
    )
}
