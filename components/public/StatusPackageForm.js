import styles from '@/styles/StatusPackageForm.module.css';

export default function StatusPackageForm() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Status Package</h2>
            <form className={styles.form}>
                <input placeholder="Code Package"></input>
                <button>Look Status</button>
            </form>
        </div>
    )
}
