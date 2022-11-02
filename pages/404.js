import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import { useRouter } from "next/router";
import styles from '@/styles/pages/404.module.scss'

const Error = () => {

    const router = useRouter()

    return (
        <Layout >
            <Meta title='Pagina no encontrada' />
            <div className={styles.errorContainer}>
                <h1>Oops! Pagina no encontrada.</h1>
                <span>404</span>
                <p>No pudimos encontrar lo que estabas buscando.</p>
                <button onClick={() => router.back()}>Volver</button>
            </div>
        </Layout>
    )
}

export default Error
