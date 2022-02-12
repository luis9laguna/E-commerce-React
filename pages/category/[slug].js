import Layout from "@/components/public/layout/Layout";
import { getProductsByCategory } from "helpers/api-util";
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

    const data = await getProductsByCategory(slug, page, sort) || ''
    if (data?.response?.status === 404) return { notFound: true }
    return {
        props: {
            data,
            title: slug
        }
    }
}

export default Category;
