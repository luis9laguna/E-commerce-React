import { useEffect, useState } from "react";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ProductItem from "@/components/public/ProductItem";
import Meta from "@/components/public/ui/Meta";
import SliderProduct from "@/components/public/ui/SliderProduct";

const Product = ({ product }) => {

    const [relatedProducts, setRelatedProducts] = useState([])
    const { get, response, loading, error } = useFetch(`${process.env.url}`)

    useEffect(async () => {
        const result = await get(`/category/${product.category}`)
        if (response.ok) setRelatedProducts(result.products)
    }, [])

    return (
        <Layout>
            <Meta title={product.name} description={product.description} />
            <ProductItem product={product} />
            <SliderProduct products={relatedProducts} description='Some products that you may like' icon='favs' />
        </Layout>
    )
}

export async function getServerSideProps({ params }) {

    const slug = params.slug

    const resp = await fetch(`${process.env.url}/product/${slug}`)
    const data = await resp.json()
    if (!data.ok) return { notFound: true }

    return {
        props: {
            product: data.product,
        },
    }
}

export default Product
