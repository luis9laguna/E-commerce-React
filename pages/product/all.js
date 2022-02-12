import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import ProductContainer from "@/components/public/ui/ProductContainer";
import { getAllProducts } from "helpers/api-util";


export default function AllProducts({ data }) {

    const url = '/product/all?'

    return (
        <Layout>
            <Meta title='All Products' />
            <ProductContainer data={data} title={'All Products'} url={url} />
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const page = query?.page || 1
    const sort = query?.sort || 'name'
    const data = await getAllProducts(page, sort) || ''

    if (data.response?.status === 404) {
        return { notFound: true }
    }

    return {
        props: {
            data
        }
    }
}