import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login';
import { FavoriteBorderOutlined, HistoryOutlined, ShopOutlined } from '@material-ui/icons';
import { useAuth } from 'context/auth/authContext';
import LoginForm from '@/components/public/auth/forms/LoginForm'
import RegisterForm from '@/components/public/auth/forms/RegisterForm';
import ForgetForm from '@/components/public/auth/forms/ForgetForm';
import styles from '@/styles/Auth.module.css'


const Auth = () => {

    const { logInGoogle } = useAuth()

    const [register, setRegister] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    //SHOW OR HIDE MODAL
    const handlerShowForgetPassword = () => setShowForgetPassword(!showForgetPassword);

    //GET PATH
    const router = useRouter()

    useEffect(() => {
        if (router.asPath === "/login#register") getRegisterForm()
        else if (router.asPath === "/login#login") getLoginForm()
    }, [router.asPath])

    //GET FORM FOR REGISTER OR LOGIN
    const getRegisterForm = () => setRegister(true)
    const getLoginForm = () => setRegister(false)

    //HANDLER GOOGLE
    const handleLogin = async googleData => logInGoogle({ token: googleData.tokenId })

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h2>Sign in or create an account</h2>
                    <div className={styles.buttonContainer}>
                        <button id='login' className={(register ? '' : styles.current)} onClick={getLoginForm}>Sign In</button>
                        <button id='register' className={(register ? styles.current : '')} onClick={getRegisterForm}>Create Account</button>
                    </div>
                    {register ? <RegisterForm /> : <LoginForm showModal={handlerShowForgetPassword} />}
                </div>
                <div >
                    <h2>Use another account</h2>
                    <div className={styles.another}>
                        <GoogleLogin
                            clientId={process.env.GOOGLE_ID}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                        <p>Join and get all the benefits!</p>
                        <ul>
                            <li> <ShopOutlined /> Save time during checkout</li>
                            <li><FavoriteBorderOutlined /> Manage your wish list</li>
                            <li><HistoryOutlined /> Access your order history</li>
                        </ul>
                    </div>
                </div>
            </div>

            {showForgetPassword && <ForgetForm onClose={handlerShowForgetPassword} />}
        </>
    )
}

export default Auth
