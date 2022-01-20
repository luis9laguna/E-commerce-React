import { FavoriteBorderOutlined, HistoryOutlined, ShopOutlined } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import styles from '@/styles/Auth.module.css'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm';
import { useRouter } from 'next/router'
import ForgetForm from './forms/ForgetForm';


const Auth = () => {

    const [register, setRegister] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    //SHOW OR HIDE MODAL
    const hideForgetPasswordHandler = () => setShowForgetPassword(false);
    const showForgetPasswordHandler = () => setShowForgetPassword(true);

    //GET PATH
    const router = useRouter()

    useEffect(() => {
        if (router.asPath === "/login#register") getRegisterForm()
        else if (router.asPath === "/login#login") getLoginForm()
    }, [router.asPath])

    //GET FORM FOR REGISTER OR LOGIN
    const getRegisterForm = () => setRegister(true)
    const getLoginForm = () => setRegister(false)


    return (
        <>
            <div className={styles.container}>
                <div>
                    <h2>Sign in or create an account</h2>
                    <div className={styles.buttonContainer}>
                        <button id='login' className={(register ? '' : styles.current)} onClick={getLoginForm}>Sign In</button>
                        <button id='register' className={(register ? styles.current : '')} onClick={getRegisterForm}>Create Account</button>
                    </div>
                    {register ? <RegisterForm /> : <LoginForm showModal={showForgetPasswordHandler} />}
                </div>
                <div >
                    <h2>Use another account</h2>
                    <div className={styles.another}>
                        <button className={styles.google}>Sign In with Google</button>
                        <p>Join and get all the benefits!</p>
                        <ul>
                            <li> <ShopOutlined /> Save time during checkout</li>
                            <li><FavoriteBorderOutlined /> Manage your wish list</li>
                            <li><HistoryOutlined /> Access your order history</li>
                        </ul>
                    </div>
                </div>
            </div>

            {showForgetPassword && <ForgetForm onClose={hideForgetPasswordHandler} />}
        </>
    )
}

export default Auth
