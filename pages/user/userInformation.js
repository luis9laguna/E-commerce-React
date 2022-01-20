import Layout from "../../components/public/layout/Layout";
import UserLayout from "../../components/public/user/UserLayout"
import Information from '../../components/public/user/userInformation/Information'

export default function UserInformation() {
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
