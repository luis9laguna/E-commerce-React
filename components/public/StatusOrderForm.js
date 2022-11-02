import useFetch from 'use-http'
import styles from '@/styles/ui/FormCreation.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup'
import Modal from './ui/Modal';
import DetailOrder from '@/components/public/ui/orders/DetailOrder'
import { toast } from 'react-toastify';
import { useState } from 'react';

const StatusOrderForm = ({ onClose }) => {

    //USEFETCH
    const { get, response, loading } = useFetch(`${process.env.url}`)

    const [detailOrder, setDetailOrder] = useState(null)

    const newClientSchema = Yup.object().shape({
        code: Yup.string()
            .min(36, 'Código es muy corto.')
            .max(36, 'Código es muy largo.')
            .required('Código es requerido.')
    })

    //FORMHANDLER
    const formSubmissionHandler = async values => {

        await get(`/order/code/${values.code}`)
        if (response.ok) {
            setDetailOrder(response.data.order)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }

    return (
        <>
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
                                <div>
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
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </ Modal>
            {detailOrder && <DetailOrder onClose={() => setDetailOrder(null)} detailOrder={detailOrder} />}
        </>
    )
}


export default StatusOrderForm