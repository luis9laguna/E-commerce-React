import Layout from "@/components/public/layout/Layout";
import { getAllCategories, getProductsByCategory } from "helpers/api-util";
import ProductContainer from "@/components/public/ui/ProductContainer";

const Category = ({ products, title }) => {
    return (
        <Layout>
            <ProductContainer products={products} title={title} />
        </Layout>
    )
};

export async function getStaticProps({ params }) {

    const slug = params.slug

    const products = await getProductsByCategory(slug)
    return {
        props: {
            products,
            title: slug
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {

    const categories = await getAllCategories()
    const slugs = categories.map(category => category.slug)
    const pathsWithParams = slugs.map(slug => ({ params: { slug: slug } }))

    return {
        paths: pathsWithParams,
        fallback: false
    }
}

export default Category;
