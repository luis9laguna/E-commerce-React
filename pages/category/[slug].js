import Layout from "@/components/public/layout/Layout";
import ContainerProduct from "@/components/public/ui/products/ContainerProduct";
import Meta from "@/components/public/ui/Meta";


const Category = ({ data, title }) => {

    return (
        <Layout>
            <Meta title={title} />
            <ContainerProduct data={data} title={title} />
        </Layout>
    )
};

export async function getServerSideProps({ params, query }) {

    const slug = params.slug
    const page = query?.page || 1
    const sort = query?.sort || 'name'

    const resp = await fetch(`${process.env.url}/category/${slug}?page=${page}&limit=15&sort=${sort}`)
    const data = await resp.json()

    if (!data.ok) return { notFound: true }
    return {
        props: {
            title: slug,
            data
        }
    }
}

export default Category;
