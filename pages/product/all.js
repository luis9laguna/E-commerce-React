import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import ContainerProduct from "@/components/public/ui/products/ContainerProduct";

const AllProducts = ({ data }) => {

    return (
        <Layout>
            <Meta title='Productos' />
            <ContainerProduct data={data} title={'Todos los productos'} />
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
