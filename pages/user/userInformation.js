import Layout from "@/components/public/layout/Layout";
import UserLayout from "@/components/public/user/UserLayout"
import UserDataForm from '@/components/public/user/userOptions/UserDataForm'
import { useEffect, useState } from "react";
import { getUserInfo } from "helpers/api-util";
import Meta from "@/components/public/ui/Meta";

export default function UserInformation() {

  const [userInfo, setUserInfo] = useState('')

  useEffect(async () => {
    const user = await getUserInfo()
    setUserInfo(user)
  }, [])

  return (
    <Layout>
      <Meta title='UserInfo' />
      <UserLayout>
        <UserDataForm userInfo={userInfo} />
      </UserLayout>
    </Layout>
  )
}
