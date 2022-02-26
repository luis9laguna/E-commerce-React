import Link from "next/link";
import { useAuth } from "context/auth/authContext";
import styles from '@/styles/ui/SignLog.module.css'

const SignLog = () => {

    const { isLoggedIn, logOut, userName } = useAuth()


    return (
        <div className='containerLogSign'>
            {isLoggedIn ? (
                <>
                    <Link href='/user/userInformation'>
                        <span className={`${styles.auth} ${styles.register}`} style={{ textTransform: 'capitalize' }}>Hi, {userName}</span>
                    </Link>
                    <button className={styles.logout} onClick={logOut}>
                        <span className={`${styles.auth} ${styles.login}`}>
                            LogOut
                        </span>
                    </button>
                </>
            )
                :
                (
                    <>
                        <Link href='/login#register'>
                            <span className={`${styles.auth} ${styles.register}`}>
                                Sing Up
                            </span>
                        </Link>
                        <Link href='/login#login'>
                            <span className={`${styles.auth} ${styles.login}`}>
                                Log In
                            </span>
                        </Link>
                    </>
                )}

        </div>
    )
}

export default SignLog