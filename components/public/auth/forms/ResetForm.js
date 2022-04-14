import styles from '@/styles/ui/Form.module.css';


const ResetForm = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>RESETEAR CONTRASEÑA</h2>
            <form className={styles.form}>
                <input placeholder="Contraseña"></input>
                <input placeholder="Confirme contraseña"></input>
                <button>CAMBIAR CONTRASEÑA</button>
                <span>Espere ... para enviar otro email.</span>
            </form>
        </div>
    )
}

export default ResetForm