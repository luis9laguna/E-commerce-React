import useFetch from 'use-http'
import styles from '@/styles/ui/FormCreation.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { regiones, provincias, comunas } from 'utils/addressInfo'
import Cookies from 'js-cookie';

const AddressForm = ({ closeForm, updateAddress, getAllAddresses, notLogged, setAddressNoUser }) => {

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { post, put, response, loading } = useFetch(`${process.env.url}`, options)


    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre Completo es muy corto.')
            .max(50, 'Nombre Completo es muy largo.')
            .required('Nombre Completo es requerido.'),
        region: Yup.string()
            .required('Region es requerida.'),
        provincia: Yup.string()
            .required('Provincia es requerida.'),
        comuna: Yup.string()
            .required('Comuna es requerida.'),
        street: Yup.string()
            .min(3, 'Calle es muy corto.')
            .max(30, 'Calle es muy largo.')
            .required('Calle es requerido.'),
        numStreet: Yup.number()
            .required('Numero de calle es requerido.'),
        infoHome: Yup.string()
            .max(10, 'Dpto/Casa es muy largo.'),
        rut: Yup.string()
            .matches(/\b[0-9|.]{1,10}\-[K|k|0-9]/gmi,
                "Ingresa un RUT válido.")
            .required('RUT es requerido.'),
        phone: Yup.string()
            .min(9, 'Telefono es muy corto.')
            .max(12, 'Telefono es muy largo.')
            .required('Telefono es requerido.'),
        extraInfo: Yup.string()
            .min(3, 'Información es muy corta.')
            .max(50, 'Información es muy larga.'),
        labelAddress: Yup.string()
            .min(3, 'Apodo es muy corto.')
            .max(30, 'Apodo es muy largo.')
            .required('Apodo es requerido.'),
    })

    const formSubmissionHandler = async values => {

        if (updateAddress) {
            await put(`/address/${updateAddress._id}`, { address: values })
        } else {
            await post('/address', { address: values })
        }
        if (response.ok) {
            toast.success(`¡${updateAddress ? 'Edición' : 'Creación'} de dirección  exitosa!`)
            if (notLogged) {
                Cookies.set('awl', response.data.address._id, { expires: 1 })
                setAddressNoUser(response.data.address)
            } else {
                getAllAddresses()
            }
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
        if (closeForm) closeForm()
    }


    console.log(updateAddress)

    return (

        <Formik
            initialValues={{
                name: updateAddress?.address?.name ?? '',
                region: updateAddress?.address?.region ?? '',
                provincia: updateAddress?.address?.provincia ?? '',
                comuna: updateAddress?.address?.comuna ?? '',
                street: updateAddress?.address?.street ?? '',
                numStreet: updateAddress?.address?.numStreet ?? '',
                infoHome: updateAddress?.address?.infoHome ?? '',
                rut: updateAddress?.address?.rut ?? '',
                phone: updateAddress?.address?.phone ?? '',
                extraInfo: updateAddress?.address?.extraInfo ?? '',
                labelAddress: notLogged ? 'no user' : updateAddress?.address?.labelAddress ?? ''
            }}
            enableReinitialize
            onSubmit={async (values, { resetForm }) => {
                formSubmissionHandler(values)
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ values, errors, touched, isSubmitting, isValid, dirty }) => {
                return (

                    <Form className={styles.formContainer}>
                        <h1 className={styles.title}>{updateAddress ? 'Edición' : 'Creación'} de dirección</h1>
                        <div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Nombre Completo*"
                                    name="name"
                                    className={errors.name && touched.name ? styles.inputError : ''}
                                />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>

                            <div className={styles.containerInput}>
                                <Field
                                    as="select"
                                    name="region"
                                    className={errors.region && touched.region ? styles.inputError : ''}
                                >
                                    <option disabled="disabled" value="">Selecciona Región*</option>
                                    {regiones?.map((region, i) => (
                                        <option key={i} value={region.codigo}>{region.nombre}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="region" component="div" className={styles.error} />
                            </div>
                            {values.region && <div className={styles.containerInput}>
                                <Field
                                    as="select"
                                    name="provincia"
                                    className={errors.provincia && touched.provincia ? styles.inputError : ''}
                                >
                                    <option disabled="disabled" value="">Selecciona Provincia*</option>
                                    {provincias.filter(provincia => provincia.codigo_padre === values.region)?.map((provincia, i) => (
                                        <option key={i} value={provincia.codigo}>{provincia.nombre}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="provincia" component="div" className={styles.error} />
                            </div>}
                            {values.provincia && <div className={styles.containerInput}>
                                <Field
                                    as="select"
                                    name="comuna"
                                    className={errors.comuna && touched.comuna ? styles.inputError : ''}
                                >
                                    <option disabled="disabled" value="">Selecciona Provincia*</option>
                                    {comunas.filter(comuna => comuna.codigo_padre === values.provincia)?.map((comuna, i) => (
                                        <option key={i} value={comuna.codigo}>{comuna.nombre}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="comuna" component="div" className={styles.error} />
                            </div>}
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Calle*"
                                    name="street"
                                    className={errors.street && touched.street ? styles.inputError : ''}
                                />
                                <ErrorMessage name="street" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Numero de calle*"
                                    name="numStreet"
                                    className={errors.numStreet && touched.numStreet ? styles.inputError : ''}
                                />
                                <ErrorMessage name="numStreet" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Dpto/Casa"
                                    name="infoHome"
                                    className={errors.infoHome && touched.infoHome ? styles.inputError : ''}
                                />
                                <ErrorMessage name="infoHome" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="RUT*"
                                    name="rut"
                                    className={errors.rut && touched.rut ? styles.inputError : ''}
                                />
                                <ErrorMessage name="rut" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Numero de contacto*"
                                    name="phone"
                                    className={errors.phone && touched.phone ? styles.inputError : ''}
                                />
                                <ErrorMessage name="phone" component="div" className={styles.error} />
                            </div>
                            <div className={styles.containerInput}>
                                <Field
                                    placeholder="Información adicional"
                                    name="extraInfo"
                                    className={errors.extraInfo && touched.extraInfo ? styles.inputError : ''}
                                />
                                <ErrorMessage name="extraInfo" component="div" className={styles.error} />
                            </div>
                            {!notLogged &&
                                <div className={styles.containerInput}>
                                    <Field
                                        placeholder="Apodo de la dirección*"
                                        name="labelAddress"
                                        className={errors.name && touched.name ? styles.inputError : ''}
                                    />
                                    <ErrorMessage name="name" component="div" className={styles.error} />
                                </div>
                            }
                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                                    : updateAddress ? 'Editar' : 'Crear'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}


export default AddressForm