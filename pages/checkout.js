import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import CheckContainer from '@/components/public/checkout/CheckContainer'

const Checkout = () => {

    return (
        <Layout>
            <Meta title='Checkout' />
            <CheckContainer />
        </Layout>
    )
}


export default Checkout
