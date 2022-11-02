import styles from './ForgotForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import useFetch from 'use-http';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify"
import { MdArrowBack, MdEmail } from 'react-icons/md';



const ForgotForm = ({ setAuthForm }) => {

    //FETCH CONFIGURATION
    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { post, response, loading } = useFetch(`${process.env.url}`, options)

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
                    toast.error('No se ha podido continuar, intente mas tarde')
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
                            <div className={styles.containerInput}>
                                <MdEmail />
                                <Field
                                    placeholder="Email*"
                                    type="email"
                                    name="email"
                                    className={errors.email && touched.email ? styles.inputError : ''}
                                />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ?
                                    <ClipLoader color="#f5f5f5" loading={loading} size={30} />
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