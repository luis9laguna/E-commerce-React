import Layout from "@/components/public/layout/Layout";
import CartItems from '@/components/public/cart/CartItems';
import Meta from "@/components/public/ui/Meta";

export default function Cart() {
  return (
    <Layout>
      <Meta title='Cart' />
      <CartItems />
    </Layout>
  )
}
