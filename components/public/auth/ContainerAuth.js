import ForgotForm from './ForgotForm'
import LogInForm from './LogInForm'
import RegisterForm from './RegisterForm'
import { useAuth } from 'context/auth/authContext'
import { useEffect } from 'react'
import Modal from "@/components/public/ui/Modal"

const ContainerAuth = ({ setAuthForm, authForm }) => {


  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) setAuthForm(null)
  }, [isLoggedIn, setAuthForm])

  return (

    <Modal onClose={() => setAuthForm(null)}>
      {authForm === 'register' && <RegisterForm setAuthForm={setAuthForm} />}
      {authForm === 'login' && <LogInForm setAuthForm={setAuthForm} />}
      {authForm === 'forgot' && <ForgotForm setAuthForm={setAuthForm} />}
      {authForm === 'reset' && <ForgotForm setAuthForm={setAuthForm} />}
    </Modal>
  )
}

export default ContainerAuth