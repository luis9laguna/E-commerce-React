import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import styles from '@/styles/ui/FormCreation.module.scss'
import Upload from '@/components/public/ui/Upload'
import Modal from '@/components/public/ui/Modal'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function FormProduct({ productUpdate, selectCategories, getProducts, setFormActive, setProductUpdate }) {

    //USEFETCH
    const options = {
        cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') }
    }
    const { post, put, response, loading } = useFetch(`${process.env.url}`, options)

    //IMAGES STATE
    const [images, setImages] = useState([])

    useEffect(() => {
        if (productUpdate) {
            setImages(productUpdate.images)
        }

        return () => setImages([])
    }, [productUpdate])

    const closeForm = () => {
        setFormActive(prev => !prev)
        setProductUpdate(null)
        setImages([])
    }

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre es muy corto.')
            .max(30, 'Nombre es muy largo.')
            .required('Nombre es requerido.'),
        category: Yup.string()
            .required('Categoria es requerida.'),
        description: Yup.string()
            .min(10, 'Descripción es muy corto.')
            .max(200, 'Descripción es muy largo.')
            .required('Descripción es requerida.'),
        price: Yup.number()
            .required('Precio es requerido.'),
        sale: Yup.number()
            .lessThan(Yup.ref("price"), 'El precio oferta tiene que ser menor al precio.'),
        cost: Yup.number()
            .lessThan(Yup.ref("price"), 'El costo tiene que ser menor al precio.')
            .required('Costo es requerido.'),
        stock: Yup.number()
            .min(1)
            .required('Stock es requerido.')
    })

    const formSubmissionHandler = async (values) => {

        values.images = images

        if (!productUpdate) {
            await post('/product', values)
        } else {
            await put(`/product/${productUpdate._id}`, values)
        }

        if (response.ok) {
            toast.success(`¡${productUpdate ? 'Edición' : 'Creación'} de producto exitosa!`)
            getProducts(1)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
        closeForm()
    }



    return (
        <Modal onClose={closeForm}>
            <Formik
                initialValues={{
                    name: productUpdate?.name ?? '',
                    category: productUpdate?.category._id ?? '',
                    description: productUpdate?.description ?? '',
                    price: productUpdate?.price ?? '',
                    sale: productUpdate?.sale ?? '',
                    cost: productUpdate?.cost ?? '',
                    stock: productUpdate?.stock ?? ''
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
                            <h1>Crea tu producto</h1>
                            <div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Nombre*"
                                        name="name"
                                        className={errors.name && touched.name ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="name" component="div" className={styles.error} />
                                </div>

                                <Upload images={images} setImages={setImages} limit={5} />

                                <div className={styles.containerInput}>
                                    <Field
                                        as="select"
                                        name="category"
                                        className={errors.category && touched.category ? styles.inputError : ''}
                                    >
                                        <option disabled="disabled" value="">Selecciona Categoria*</option>
                                        {selectCategories?.map((category, i) => (
                                            <option key={i} value={category._id}>{category.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Descripción*"
                                        as="textarea"
                                        name="description"
                                        className={errors.description && touched.description ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="description" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Precio*"
                                        name="price"
                                        type="number"
                                        className={errors.price && touched.price ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="price" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Precio Oferta*"
                                        name="sale"
                                        type="number"
                                        className={errors.sale && touched.sale ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="sale" component="div" className={styles.error} />
                                </div>
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Costo*"
                                        name="cost"
                                        type="number"
                                        className={errors.cost && touched.cost ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="cost" component="div" className={styles.error} />
                                </div>
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
                                    {loading ?
                                        <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                        : productUpdate ? 'Editar' : 'Crear'}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

