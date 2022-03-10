import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/ProductContainer";
import Meta from "@/components/public/ui/Meta";


const Category = ({ data, title }) => {

    const url = `/category/${title}?`
    return (
        <Layout>
            <Meta title={title} />
            <ProductContainer data={data} title={title} url={url} />
        </Layout>
    )
};

export async function getServerSideProps({ params, query }) {

    const slug = params.slug
    const page = query?.page || 1
    const sort = query?.sort || 'name'

    const resp = await fetch(`${process.env.url}/category/${slug}?page=${page}&limit=15&sort=${sort}`)
    const data = await resp.json()
    console.log(data)
    if (!data.ok) return { notFound: true }
    return {
        props: {
            title: slug,
            data
        }
    }
}

export default Category;
