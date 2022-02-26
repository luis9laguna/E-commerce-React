import { useEffect, useState } from "react";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import UserLayout from "@/components/public/user/UserLayout"
import UserDataForm from '@/components/public/user/userOptions/UserDataForm'
import Meta from "@/components/public/ui/Meta";

const UserInformation = () => {

  const [userInfo, setUserInfo] = useState('')

  //USEFETCH
  const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
  const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

  const getUser = async () => {
    const user = await get(`/user`)
    if (response.ok) setUserInfo(user.user)
  }
  useEffect(() => { getUser() }, [])

  return (
    <Layout>
      <Meta title='UserInfo' />
      <UserLayout>
        <UserDataForm userInfo={userInfo} />
      </UserLayout>
    </Layout>
  )
}

export default UserInformation
