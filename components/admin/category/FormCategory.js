import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Upload from '@/components/public/ui/Upload'
import styles from '@/styles/ui/FormCreation.module.scss'
import Modal from '@/components/public/ui/Modal'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'

export default function FormCategory({ categoryUpdate, setFormActive, getCategories, setCategoryUpdate }) {

    //USEFETCH
    const options = {
        cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') }
    }
    const { post, put, response, loading } = useFetch(`${process.env.url}`, options)

    const [images, setImages] = useState([])

    useEffect(() => {
        if (categoryUpdate) {
            setImages([categoryUpdate.image])
        }
        return () => setImages([])
    }, [categoryUpdate])


    const closeForm = () => {
        setFormActive(prev => !prev)
        setCategoryUpdate(null)
        setImages([])
    }


    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre es muy corto.')
            .max(30, 'Nombre es muy largo.')
            .required('Nombre es requerido.')
    })

    const formSubmissionHandler = async (values) => {
        const form = {
            images,
            name: values.name
        }

        if (!categoryUpdate) {
            await post('/category', form)
        } else {
            await put(`/category/${categoryUpdate._id}`, form)
        }

        if (response.ok) {
            toast.success(`¡${categoryUpdate ? 'Edición' : 'Creación'} de categoria  exitosa!`)
            getCategories()
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
        closeForm()
    }


    return (
        <Modal onClose={closeForm}>
            <Formik
                initialValues={{
                    name: categoryUpdate?.name ?? ''
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
                            <h1>{categoryUpdate ? 'Edita' : 'Crea'} tu categoria</h1>
                            <div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Nombre*"
                                        name="name"
                                        className={errors.name && touched.name ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="name" component="div" className={styles.error} />
                                </div>

                                <Upload images={images} setImages={setImages} limit={1} />
                                <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                    {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                        : categoryUpdate ? 'Editar' : 'Crear'}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </ Modal>
    )
}

