import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ContainerProduct from "@/components/public/ui/products/ContainerProduct";
import Meta from "@/components/public/ui/Meta";
import { useAuth } from "context/auth/authContext";
import { SyncLoader } from "react-spinners";
import styles from '@/styles/pages/WishList.module.scss'
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const WishList = () => {

  //USEFETCH
  const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
  const { get, response, loading } = useFetch(`${process.env.url}`, options)

  //DATA
  const [data, setData] = useState(null)
  const [deleteFav, setDeleteFav] = useState(false)

  //IS THE USER LOGGED IN?
  const { isLoading, isLoggedIn } = useAuth()

  //PAGINATION AND PARAMETERS
  const router = useRouter()
  const page = router.query.page || 1
  const sort = router.query.sort || 'name'

  const getLikedProducts = useCallback(async () => {
    await get(`/like?page=${page}&limit=15&sort=${sort}`)
    if (response.ok) setData(response.data)
    else toast.error('¡No se han podido obtener tus productos favoritos, intente mas tarde!')
  }, [get, page, sort, response])


  useEffect(() => {
    if (isLoggedIn) getLikedProducts()
    if (deleteFav) setDeleteFav(false)
  }, [page, sort, deleteFav, isLoggedIn, getLikedProducts])

  if (isLoading || loading) return (
    <div className={styles.spinner}>
      <SyncLoader color={'#303030'} loading={isLoading || loading} size={50} />
    </div>
  )

  if (!isLoggedIn) {
    router.replace('/')
    return <div></div>
  }

  return (
    <Layout>
      <Meta title='WishList' />
      <>
        {data?.products.length > 0 ?
          <ContainerProduct setDeleteFav={setDeleteFav} data={data} title={'Tus favoritos'} />
          :
          <h2 className={styles.h2}>
            No tienes ningun producto añadido a tu lista de deseado, ve y echa un vistazo a alguno de nuestros
            <Link href='/product/all'> productos!</Link>
          </h2>
        }
      </>
    </Layout>
  )
}

export default WishList
