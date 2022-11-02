import useFetch from 'use-http'
import styles from '@/styles/ui/FormCreation.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup'
import Modal from './ui/Modal';
import { toast } from 'react-toastify';

const StatusOrderForm = ({ onClose, setDetailOrder }) => {

    //USEFETCH
    const { post, response, loading } = useFetch(`${process.env.url}`)



    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre es muy corto.')
            .max(30, 'Nombre es muy largo.')
            .required('Nombre es requerido.')
    })


    //FORMHANDLER
    const formSubmissionHandler = async values => {

        await post('/order/code/status', values)

        if (response.ok) {

            console.log(response.data)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }

    return (
        <Modal onClose={onClose}>
            <Formik
                initialValues={{
                    code: ''
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
                            <h1>Estado de Paquete</h1>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Código*"
                                    name="code"
                                    className={errors.code && touched.code ? styles.inputError : ''}
                                />
                                <ErrorMessage name="code" component="div" className={styles.error} />
                            </div>
                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                    : 'Revisar'}
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </ Modal>
    )
}


export default StatusOrderForm