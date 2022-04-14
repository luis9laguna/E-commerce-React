import { useEffect, useState } from "react";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ProductItem from "@/components/public/ProductItem";
import Meta from "@/components/public/ui/Meta";
import SliderProduct from "@/components/public/ui/SliderProduct";
import Loading from "@/components/public/ui/Loading";
import ErrorMessage from "@/components/public/ui/ErrorMessage";

const Product = ({ product }) => {

    const [relatedProducts, setRelatedProducts] = useState([])
    const options = { cachePolicy: 'no-cache' }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

    useEffect(async () => {
        const result = await get(`/category/${product.category.slug}`)
        if (response.ok) setRelatedProducts(result.products)
    }, [])

    return (
        <Layout>
            <Meta title={product.name} description={product.description} />
            <ProductItem product={product} />
            {loading ? <Loading space={true} /> :
                <SliderProduct products={relatedProducts} description='Algunos productos que te podrian gustar' icon='favs' />
            }
            {error && <ErrorMessage />}
        </Layout>
    )
}

export async function getServerSideProps({ params }) {

    const slug = params.slug

    const resp = await fetch(`${process.env.url}/product/${slug}`)
    const data = await resp.json()
    if (!data.ok) return { notFound: true }

    if (data.product.price === 130) return { notFound: true }
    return {
        props: {
            product: data.product,
        },
    }
}

export default Product
