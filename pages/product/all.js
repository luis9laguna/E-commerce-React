import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import ProductContainer from "@/components/public/ui/ProductContainer";

const AllProducts = ({ data }) => {

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

    const resp = await fetch(`${process.env.url}/product?page=${page}&limit=15&sort=${sort}`)
    const data = await resp.json()
    if (!data.ok) return { notFound: true }

    return {
        props: {
            data
        }
    }
}

export default AllProducts
