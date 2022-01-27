import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/ProductContainer";
import { getAllProducts } from "helpers/api-util";


export default function AllProducts({ products }) {
    return (
        <Layout>
            <ProductContainer products={products} title={'All Products'} />
        </Layout>
    )
}

export async function getStaticProps() {
    const products = await getAllProducts()
    return {
        props: {
            products
        },
        revalidate: 10
    }
}