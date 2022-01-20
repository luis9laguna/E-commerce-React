import Layout from "../../components/public/layout/Layout";
import UserLayout from "../../components/public/user/UserLayout"
import Form from "../../components/public/user/changePassword/Form";

export default function ChangePassword() {
  return (
    <div>
      <Layout>
        <UserLayout>
          <Form />
        </UserLayout>
      </Layout>
    </div>
  )
}
