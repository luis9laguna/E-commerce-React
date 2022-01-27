import Link from "next/link";
import { useAuth } from "context/auth/authContext";

export default function SignLog() {

    const { user, logOut } = useAuth()


    return (
        <div className='containerLogSign'>
            {user ? (
                <>
                    <Link href='/user/userInformation'>
                        <span className="auth register" style={{ textTransform: 'capitalize' }}>Hi, {user}</span>
                    </Link>
                    <button className='logout' onClick={logOut}>
                        <span className='auth login'>
                            LogOut
                        </span>
                    </button>
                </>
            )
                :
                (
                    <>
                        <Link href='/login#register'>
                            <span className='auth register'>
                                Sing Up
                            </span>
                        </Link>
                        <Link href='/login#login'>
                            <span className='auth login'>
                                Log In
                            </span>
                        </Link>
                    </>
                )}

        </div>
    )
}


{/*  */ }