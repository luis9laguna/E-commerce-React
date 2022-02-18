import { useEffect, useState } from "react";
import Layout from "@/components/public/layout/Layout";
import ProductItem from "@/components/public/ProductItem";
import Meta from "@/components/public/ui/Meta";
import { getProductBySlug, getProductsByCategory } from "helpers/api-util";
import SliderProduct from "@/components/public/ui/SliderProduct";

export default function Product({ product }) {

    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(async () => {
        const result = await getProductsByCategory(product.category)
        setRelatedProducts(result.products)
    }, [])

    return (
        <Layout>
            <Meta title={product.name} description={product.description} />
            <ProductItem product={product} />
            <SliderProduct products={relatedProducts} description='Some products that you may like' icon='favs' />
        </Layout>
    )
}

export async function getStaticProps({ params }) {

    const product = await getProductBySlug(params.slug)
    if (!product) return { redirect: { destination: '/404' } }

    return {
        props: {
            product
        },
        revalidate: 1
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