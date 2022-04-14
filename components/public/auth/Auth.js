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
                    <h2>Ingresa o crea una nueva cuenta</h2>
                    <div className={styles.buttonContainer}>
                        <button id='login' className={register ? '' : styles.current} onClick={getLoginForm}>Ingresar</button>
                        <button id='register' className={register ? styles.current : ''} onClick={getRegisterForm}>Crear cuenta</button>
                    </div>
                    {register ? <RegisterForm /> : <LoginForm showModal={handlerShowForgetPassword} />}
                </div>
                <div >
                    <h2>Usa otra cuenta</h2>
                    <div className={styles.another}>
                        <GoogleLogin
                            clientId={process.env.GOOGLE_ID}
                            buttonText="Ingresa con Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                        <p>Ingresa y obtén beneficios</p>
                        <ul>
                            <li> <ShopOutlined />Salva tiempo a la hora de pagar</li>
                            <li><FavoriteBorderOutlined />Maneja tu lista de deseados</li>
                            <li><HistoryOutlined />Accede a tu historial de ordenes</li>
                        </ul>
                    </div>
                </div>
            </div>
            {showForgetPassword && <ForgetForm onClose={handlerShowForgetPassword} />}
        </>
    )
}

export default Auth
