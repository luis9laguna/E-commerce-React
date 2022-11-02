import Modal from '@/components/public/ui/Modal'
import styles from '@/styles/ui/FormCreation.module.scss'
import useFetch from 'use-http'
import { ClipLoader } from 'react-spinners'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'


const FormStock = ({ setShowStock, setProductUpdate, productUpdate, getProducts }) => {

    //USEFETCH
    const options = {
        cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') }
    }
    const { put, response, loading } = useFetch(`${process.env.url}/product/stock`, options)

    const closeForm = () => {
        setShowStock(prev => !prev)
        setProductUpdate(null)
    }

    const newClientSchema = Yup.object().shape({
        stock: Yup.string().required('Nombre es requerido.')
    })

    const handlerFormSubmit = async (values) => {

        await put(`/${productUpdate._id}`, values)
        if (response.ok) {
            toast.success('Stock actualizado exitosamente!')
            getProducts(1)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
        closeForm()
    }

    return (
        <Modal onClose={closeForm} >
            <Formik
                initialValues={{
                    stock: ''
                }}
                onSubmit={async (values, { resetForm }) => {
                    handlerFormSubmit(values)
                    resetForm()
                }}
                validationSchema={newClientSchema}
            >
                {({ errors, touched, isSubmitting, isValid, dirty }) => {
                    return (

                        <Form className={styles.formContainer}>
                            <h1>Agregar o restar stock de &quot;<span>{productUpdate.name}</span>&quot;</h1>
                            <div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Stock*"
                                        name="stock"
                                        type="number"
                                        className={errors.stock && touched.stock ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="stock" component="div" className={styles.error} />
                                </div>
                                <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                    {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                        : 'Actualizar Stock'}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal >
    )
}

export default FormStock