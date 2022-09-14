import ForgotForm from './ForgotForm'
import LogInForm from './LogInForm'
import RegisterForm from './RegisterForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from 'context/auth/authContext'

const ContainerAuth = ({ setAuthForm, authForm }) => {


  const { isLoggedIn, isLoading } = useAuth()

  return (

    <>
      {authForm === 'register' && <RegisterForm setAuthForm={setAuthForm} />}
      {authForm === 'login' && <LogInForm setAuthForm={setAuthForm} />}
      {authForm === 'forgot' && <ForgotForm setAuthForm={setAuthForm} />}
      <ToastContainer />
    </>
  )
}

export default ContainerAuth