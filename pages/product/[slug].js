import Layout from "@/components/public/layout/Layout";
import ProductItem from "@/components/public/ProductItem";
import { getProductBySlug } from "helpers/api-util";

export default function Product({ product }) {

    return (
        <Layout>
            <ProductItem product={product} />
        </Layout>
    )
}

export async function getStaticProps({ params }) {

    const product = await getProductBySlug(params.slug)
    if (!product) return { notFound: true }

    return {
        props: {
            product
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: '' } }
        ],
        fallback: 'blocking'
    }
}