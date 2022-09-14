import styles from './LogInForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import ClipLoader from "react-spinners/ClipLoader";
import GoogleLogin from 'react-google-login';
import { useAuth } from 'context/auth/authContext';
import { MdEmail, MdLock } from 'react-icons/md';


const LoginForm = ({ setAuthForm }) => {


    const { logIn, fetchLoading, logInGoogle } = useAuth()

    const newClientSchema = Yup.object().shape({
        email: Yup.string()
            .email('Debe ser un email válido.')
            .required('Email es requerido.'),
        password: Yup.string()
            .required('Contraseña es requerida.')
    })

    //HANDLER GOOGLE
    const handleLogin = async googleData => logInGoogle({ token: googleData.tokenId })

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values, { resetForm }) => {
                await logIn(values)
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (
                    <div className={styles.formContainer}>
                        <h1>Ingresar</h1>
                        <Form>
                            <div>
                                <div className={styles.containerInput}>
                                    <MdEmail />
                                    <Field
                                        placeholder="Email*"
                                        type="email"
                                        name="email"
                                        className={errors.email && touched.email ? styles.inputError : ''}
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <div>
                                <div className={styles.containerInput}>
                                    <MdLock />
                                    <Field
                                        placeholder="Contraseña*"
                                        type="password"
                                        name="password"
                                        className={errors.password && touched.password ? styles.inputError : ''}
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <span onClick={() => setAuthForm('forgot')}>¿Olvidaste la contraseña?</span>

                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {fetchLoading ?
                                    <ClipLoader loading={fetchLoading} size={30} />
                                    : 'Ingresar'}
                            </button>
                        </Form>
                        <span>O ingresa usando</span>

                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_ID}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className={styles.google}>
                                    {fetchLoading ?
                                        <ClipLoader loading={fetchLoading} size={30} />
                                        : 'G'}
                                </button>
                            )}
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />

                        <span onClick={() => setAuthForm('register')}>¿No tienes una cuenta aún ? ¡Registrate!</span>
                    </div>

                )
            }}
        </Formik>
    )
}

export default LoginForm