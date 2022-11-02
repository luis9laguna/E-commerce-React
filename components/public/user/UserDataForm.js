import { useCallback, useEffect, useState } from 'react';
import useFetch from 'use-http'
import { useAuth } from 'context/auth/authContext';
import styles from '@/styles/ui/FormCreation.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const UserDataForm = () => {

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { get, put, response, loading } = useFetch(`${process.env.url}`, options)

    const { updateUser } = useAuth()
    const [userInfo, setUserInfo] = useState('')


    useEffect(() => getUser(), [getUser]);

    const getUser = useCallback(async () => {
        await get(`/user`)
        if (response.ok) {
            setUserInfo(response.data.user)
        } else {
            toast.error('Ha ocurrido un error, no se han podido obtener sus datos')
        }
    }, [get, response])


    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre es muy corto.')
            .max(30, 'Nombre es muy largo.')
            .required('Nombre es requerido.'),
        lastname: Yup.string()
            .min(3, 'Apellido es muy corto.')
            .max(30, 'Apellido es muy largo.')
            .required('Apellido es requerido.')
    })

    const formSubmissionHandler = async values => {
        await put(`/user`, values)
        if (response.ok) {
            updateUser(values.name)
            getUser();
            toast.success('¡Tu información ha sido cambiada con exito!')
        } else {
            toast.error('¡Ha ocurrido un error! porfavor intente mas tarde')
        }
    }


    return (
        <Formik
            initialValues={{
                name: userInfo.name ?? '',
                lastname: userInfo.lastname ?? ''
            }}
            enableReinitialize
            onSubmit={async (values, { resetForm }) => {
                formSubmissionHandler(values)
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (

                    <Form className={styles.formContainer}>
                        <h1 className={styles.title}>Informacion del usuario</h1>
                        <div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Nombre*"
                                    name="name"
                                    className={errors.name && touched.name ? styles.inputError : ''}
                                />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Apellido*"
                                    name="lastname"
                                    className={errors.lastname && touched.lastname ? styles.inputError : ''}
                                />
                                <ErrorMessage name="lastname" component="div" className={styles.error} />
                            </div>

                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                    : 'Editar'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}


export default UserDataForm