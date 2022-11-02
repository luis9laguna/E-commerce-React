import useFetch from 'use-http'
import Modal from '@/components/public/ui/Modal'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import styles from '@/styles/ui/FormCreation.module.scss'

const FormAdmin = ({ getAdmins, adminUpdate, setFormActive, setAdminUpdate }) => {

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { post, put, response, loading } = useFetch(`${process.env.url}`, options)

    const closeForm = () => {
        setAdminUpdate(null)
        setFormActive(prev => !prev)
    }

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre es muy corto.')
            .max(30, 'Nombre es muy largo.')
            .required('Nombre es requerido.'),
        lastname: Yup.string()
            .min(3, 'Apellido es muy corto.')
            .max(30, 'Apellido es muy largo.')
            .required('Apellido es requerido.'),
        email: Yup.string()
            .email('Debe ser un email válido.')
            .max(30, 'Email es muy largo.')
            .required('Email es requerido.'),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "La contraseña debe tener 8 carácteres, 1 Mayuscula, 1 Minuscula y un númerico.")
            .required('Contraseña es requerida.'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.')
            .required('Confirmar Contraseña es requerido.')
    })


    //FORMHANDLER
    const formSubmissionHandler = async values => {

        const name = values.name
        const lastname = values.lastname
        const email = values.email
        const password = values.password

        if (!adminUpdate) {
            await post('/admin', {
                name,
                lastname,
                email,
                password
            })
        } else {
            await put(`/admin/${adminUpdate._id}`, {
                name,
                lastname,
                email
            })
        }

        if (response.ok) {
            toast.success('¡El admin ha sido creado!')
            getAdmins(1)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }

        closeForm()
    }

    return (
        <Modal onClose={closeForm}>
            <Formik
                initialValues={{
                    name: adminUpdate?.name ?? '',
                    lastname: adminUpdate?.lastname ?? '',
                    email: adminUpdate?.email ?? '',
                    password: adminUpdate ? 'Contras123' : '',
                    confirmpassword: adminUpdate ? 'Contras123' : '',
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
                            <h1>{adminUpdate ? 'Edita' : 'Crea'} admin</h1>
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
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Email*"
                                        name="email"
                                        className={errors.email && touched.email ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="email" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Contraseña*"
                                        name="password"
                                        className={errors.password && touched.password ? styles.inputError : ''}
                                        disabled={adminUpdate}
                                        type='password'
                                    />
                                    <ErrorMessage name="password" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Confirma Contraseña*"
                                        name="confirmpassword"
                                        className={errors.confirmpassword && touched.confirmpassword ? styles.inputError : ''}
                                        disabled={adminUpdate}
                                        type='password'
                                    />
                                    <ErrorMessage name="confirmpassword" component="div" className={styles.error} />
                                </div>
                                <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                    {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                        : adminUpdate ? 'Editar' : 'Crear'}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </ Modal>
    )
}

export default FormAdmin