import Link from "next/link";
import { useAuth } from "context/auth/authContext";
import styles from '@/styles/ui/SignLog.module.css'

const SignLog = () => {

    const { isLoggedIn, logOut, userName } = useAuth()

    return (
        <div className='containerLogSign'>
            {isLoggedIn ?
                <>
                    <Link href='/user/userInformation'>
                        <span className={`${styles.auth} ${styles.register}`} style={{ textTransform: 'capitalize' }}>Hola, {userName}</span>
                    </Link>
                    <button className={styles.logout} onClick={logOut}>
                        <span className={`${styles.auth} ${styles.login}`}>
                            Cerrar Sesión
                        </span>
                    </button>
                </>
                :
                <>
                    <Link href='/login#register'>
                        <span className={`${styles.auth} ${styles.register}`}>
                            Registrar
                        </span>
                    </Link>
                    <Link href='/login#login'>
                        <span className={`${styles.auth} ${styles.login}`}>
                            Ingresar
                        </span>
                    </Link>
                </>
            }

        </div>
    )
}

export default SignLog