import Link from "next/link";

export default function SignLog() {
    return (
        <div className='containerLogSign'>
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
        </div>
    )
}
