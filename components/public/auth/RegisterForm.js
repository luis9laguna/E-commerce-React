import styles from './RegisterForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from 'context/auth/authContext';
import { MdEmail, MdLock, MdLockClock, MdPeople, MdPerson } from 'react-icons/md';


const RegisterForm = ({ setAuthForm }) => {


  const { userRegister, fetchLoading } = useAuth()


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
      .required('Confirmar Contraseña es requerido.'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Aceptar los Terminos y Condiciones es requerido.')

  })

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        acceptTerms: false
      }}
      onSubmit={async (values, { resetForm }) => {
        await userRegister(values)
        resetForm()
      }}
      validationSchema={newClientSchema}
    >
      {({ errors, touched, isSubmitting, isValid, dirty }) => {
        return (
          <div className={styles.formContainer}>
            <h1>Registrar</h1>
            <Form className={styles.form}>
              <div className={styles.containerInput}>
                <MdPerson />
                <Field
                  placeholder="Nombre*"
                  type="text"
                  name="name"
                  className={errors.name && touched.name ? styles.inputError : ''}
                />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.containerInput}>
                <MdPeople />
                <Field
                  placeholder="Apellido*"
                  type="text"
                  name="lastname"
                  className={errors.lastname && touched.lastname ? styles.inputError : ''}
                />
                <ErrorMessage name="lastname" component="div" className={styles.error} />
              </div>

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

              <div className={styles.containerInput}>
                <MdLock />
                <Field
                  placeholder="Contraseña*"
                  type="password"
                  name="password"
                  className={errors.password && touched.password ? styles.inputError : ''}
                />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>

              <div className={styles.containerInput}>
                <MdLockClock />
                <Field
                  placeholder="Confirma Contraseña*"
                  type="password"
                  name="confirmpassword"
                  className={errors.confirmpassword && touched.confirmpassword ? styles.inputError : ''}
                />
                <ErrorMessage name="confirmpassword" component="div" className={styles.error} />
              </div>

              <div className={styles.acceptTerms}>
                <label htmlFor="acceptTerms" className="form-check-label">¿Aceptas Terminos y Condiciones?
                  <Field type="checkbox" id="acceptTerms" name="acceptTerms" />
                </label>
                <ErrorMessage name="acceptTerms" component="div" className={styles.error} />
              </div>

              <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                {fetchLoading ?
                  <ClipLoader color="#f5f5f5" loading={fetchLoading} size={30} />
                  : 'Registrar'}
              </button>
            </Form>
            <span onClick={() => setAuthForm('login')}>¿Ya posees una cuenta? Haz click aqui</span>
          </div>
        )
      }}
    </Formik>
  )
}

export default RegisterForm