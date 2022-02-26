import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import { useRouter } from "next/router";
import styles from '@/styles/404.module.css'

const Error = () => {

    const router = useRouter()

    return (
        <Layout >
            <Meta title='Page not Found' />
            <div className={styles.errorContainer}>
                <h1>Oops! Page not found.</h1>
                <span>404</span>
                <p>We cant find the page you're looking for.</p>
                <button onClick={() => router.back()}>Go back</button>
            </div>
        </Layout>
    )
}

export default Error
