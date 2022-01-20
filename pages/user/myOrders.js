import Layout from "../../components/public/layout/Layout";
import UserLayout from "../../components/public/user/UserLayout";
import Orders from "../../components/public/user/myOrders/Orders";


export default function MyOrders() {
  return (
    <div>
      <Layout>
        <UserLayout>
          <Orders />
        </UserLayout>
      </Layout>
    </div>
  )
}
