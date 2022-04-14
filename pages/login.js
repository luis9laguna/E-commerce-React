import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/public/layout/Layout";
import Auth from "@/components/public/auth/Auth";
import { useAuth } from "context/auth/authContext";
import Meta from "@/components/public/ui/Meta";


const Login = () => {

  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => { if (isLoggedIn) router.replace('/') }, []);

  if (isLoggedIn) return <div></div>
  return (
    <Layout>
      <Meta title='Autenticar' description='Ingresa o crea una cuenta' />
      <Auth />
    </Layout>
  )
}
export default Login

