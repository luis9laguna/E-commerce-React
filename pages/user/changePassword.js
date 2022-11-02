import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import UserLayout from "@/components/public/user/UserLayout"
import Form from "@/components/public/user/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Layout>
      <Meta title='Cambiar contraseña' />
      <UserLayout>
        <Form />
      </UserLayout>
    </Layout>
  )
}

export default ChangePassword