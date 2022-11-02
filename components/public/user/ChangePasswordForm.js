import { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { useAuth } from 'context/auth/authContext';
import styles from '@/styles/ui/FormCreation.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const ChangePasswordForm = () => {

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { put, response, loading } = useFetch(`${process.env.url}/auth`, options)

    const newClientSchema = Yup.object().shape({
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "La contraseña debe tener 8 carácteres, 1 Mayuscula, 1 Minuscula y un númerico.")
            .required('Contraseña es requerida.'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.')
            .required('Confirmar Contraseña es requerido.')
    })

    const formSubmissionHandler = async values => {

        await put('/change-password', values)
        if (response.ok) {
            toast.success('¡Tu información ha sido cambiada con exito!')
        } else {
            toast.error('¡Ha ocurrido un error! porfavor intente mas tarde')
        }
    }

    return (
        <Formik
            initialValues={{
                password: '',
                confirmpassword: ''
            }}
            onSubmit={async (values, { resetForm }) => {
                formSubmissionHandler(values)
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (

                    <Form className={styles.formContainer}>
                        <h1 className={styles.title}>Cambia tu contraseña</h1>
                        <div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Contraseña*"
                                    name="password"
                                    className={errors.password && touched.password ? styles.inputError : ''}
                                />
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Confirma Contraseña*"
                                    name="confirmpassword"
                                    className={errors.confirmpassword && touched.confirmpassword ? styles.inputError : ''}
                                />
                                <ErrorMessage name="confirmpassword" component="div" className={styles.error} />
                            </div>

                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                    : 'Cambiar'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}


export default ChangePasswordForm