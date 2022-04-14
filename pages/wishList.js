import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/products/ProductContainer";
import Meta from "@/components/public/ui/Meta";
import { useAuth } from "context/auth/authContext";
import Loading from "@/components/public/ui/Loading";
import ErrorMessage from "@/components/public/ui/ErrorMessage";

const WishList = () => {

  //DATA
  const [data, setData] = useState([])
  const [deleteFav, setDeleteFav] = useState(false)

  //IS THE USER LOGGED IN?
  const { isLoggedIn } = useAuth()

  //PAGINATION AND PARAMETERS
  const router = useRouter()
  const page = router.query?.page || 1
  const sort = router.query?.sort || 'name'
  const url = '/wishList?'

  //USEFETCH
  const storage = typeof localStorage !== 'undefined';
  let options
  if (storage) {
    options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
  }
  const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

  const getLikedProducts = async () => {
    const products = await get(`/like?page=${page}&limit=15&sort=${sort}`)
    if (response.ok) setData(products)
  }


  useEffect(() => {
    if (isLoggedIn) getLikedProducts()
    if (deleteFav) setDeleteFav(false)
  }, [page, sort, deleteFav, isLoggedIn])

  return (
    <Layout>
      <Meta title='WishList' />
      {error && <ErrorMessage />}
      {loading ? <Loading space={true} /> :
        <>
          {!isLoggedIn ?
            <h2 style={{ textAlign: 'center', margin: '5rem 0' }}>
              ¡Para tener acceso a los productos guardados debes acceder a tu
              <Link href='/login#login'><span style={{ color: 'red', cursor: 'pointer' }}> cuenta!</span></Link>
            </h2>
            :
            <>
              {data.length !== undefined ?
                <ProductContainer setDeleteFav={setDeleteFav} data={data} title={'Your WishList'} url={url} />
                :
                <>
                  {error ? ErrorMessage :
                    <h2 style={{ textAlign: 'center', margin: '5rem 0' }}>
                      No tienes ningun producto añadido a tu lista de deseado, ve y echa un vistazo a alguno de nuestros
                      <Link href='/product/all'><span style={{ color: 'red', cursor: 'pointer' }}> productos!</span></Link>
                    </h2>
                  }
                </>
              }
            </>
          }
        </>
      }
    </Layout>
  )
}

export default WishList
