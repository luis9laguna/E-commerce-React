import styles from './ForgotForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import useFetch from 'use-http';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify"
import { MdArrowBack, MdEmail } from 'react-icons/md';



const ForgotForm = ({ setAuthForm }) => {

    //FETCH CONFIGURATION
    const { post, response, loading } = useFetch(`${process.env.REACT_APP_URL}`)

    const newClientSchema = Yup.object().shape({
        email: Yup.string()
            .email('Debe ser un email válido.')
            .required('Email es requerido.')
    })

    return (
        <Formik
            initialValues={{
                email: '',
            }}
            onSubmit={async (values, { resetForm }) => {
                await post('auth/password-reset', values)
                if (response.ok) {
                    toast.success('Revisa tu email para continuar.')
                } else {
                    toast.error(response.data.message)
                }
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (
                    <div className={styles.formContainer}>
                        <MdArrowBack onClick={() => setAuthForm('login')} />
                        <h1>Forgot Email</h1>
                        <Form className={styles.form}>
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
                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ?
                                    <ClipLoader loading={loading} size={30} />
                                    : 'Sent Email'}
                            </button>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default ForgotForm