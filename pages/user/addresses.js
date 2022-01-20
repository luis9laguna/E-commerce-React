import Layout from "../../components/public/layout/Layout";
import Information from "../../components/public/user/addresses/information";
import UserLayout from "../../components/public/user/UserLayout"

export default function Addresses() {
  return (
    <div>
      <Layout>
        <UserLayout>
          <Information />
        </UserLayout>
      </Layout>
    </div>
  )
}
