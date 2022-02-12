import Layout from "@/components/public/layout/Layout";
import CartItems from '@/components/public/CartItems';
import Meta from "@/components/public/ui/Meta";

export default function Home() {
  return (
    <Layout>
      <Meta title='Cart' />
      <CartItems />
    </Layout>
  )
}
