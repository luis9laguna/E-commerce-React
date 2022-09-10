import { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/router";
import GoogleLogin from 'react-google-login';
import styles from '@/styles/Auth.module.css'
import { useAuth } from "context/auth/authContext";
import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import LoginForm from '@/components/public/auth/forms/LoginForm'
import RegisterForm from '@/components/public/auth/forms/RegisterForm';
import ForgetForm from '@/components/public/auth/forms/ForgetForm';
import { FavoriteBorderOutlined, HistoryOutlined, ShopOutlined } from '@material-ui/icons';

const Login = () => {

  const { isLoggedIn, logInGoogle } = useAuth()
  const router = useRouter()

  const [register, setRegister] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  useEffect(() => { isLoggedIn && router.replace('/') }, [router, isLoggedIn]);
  useEffect(() => getPath(), [getPath])

  const getPath = useCallback(() => {
    const routerPath = router.asPath
    routerPath === '/login#register' ? getRegisterForm() : getLoginForm()
  }, [router.asPath])

  //GET FORM FOR REGISTER OR LOGIN
  const getRegisterForm = () => setRegister(true)
  const getLoginForm = () => setRegister(false)

  //SHOW OR HIDE MODAL
  const handlerShowForgetPassword = () => setShowForgetPassword(!showForgetPassword);

  //HANDLER GOOGLE
  const handleLogin = async googleData => logInGoogle({ token: googleData.tokenId });

  if (isLoggedIn) return <div></div>
  return (
    <Layout>
      <Meta title='Autenticar' description='Ingresa o crea una cuenta' />
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
    </Layout>
  )
}
export default Login

