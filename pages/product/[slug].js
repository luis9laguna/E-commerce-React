import { useCallback, useEffect, useState } from "react";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ProductItem from "@/components/public/ProductItem";
import Meta from "@/components/public/ui/Meta";
import SliderProduct from "@/components/public/ui/products/SliderProduct";
import { SyncLoader } from 'react-spinners';
import { toast } from "react-toastify";

const Product = ({ product }) => {

    const [relatedProducts, setRelatedProducts] = useState([])
    const { get, response, loading } = useFetch(`${process.env.url}`, { cachePolicy: 'no-cache' })


    const getCategories = useCallback(async () => {
        await get(`/category/${product.category.slug}`)
        if (response.ok) {
            setRelatedProducts(response.data.products)
        } else {
            toast.error('¡Ha ocurrido un error, intente mas tarde!')
        }
    }, [get, response, product.category.slug])

    useEffect(() => getCategories(), [getCategories])

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem'
    }

    return (
        <Layout>
            <Meta title={product.name} description={product.description} />
            <ProductItem product={product} />
            {loading ? <div style={style}><SyncLoader color='#303030' size={50} /></div> :
                <SliderProduct products={relatedProducts} description='Algunos productos que te podrian gustar' icon='favs' />
            }
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
