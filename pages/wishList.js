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

  console.log(data.length)

  return (
    <Layout>
      <Meta title='WishList' />
      {error && <ErrorMessage />}
      {loading ? <Loading space={true} /> :
        <>
          {!isLoggedIn ?
            <h2 style={{ textAlign: 'center', margin: '5rem 0' }}>
              To get access to your saved products you must access to your
              <Link href='/login#login'><span style={{ color: 'red', cursor: 'pointer' }}> account!</span></Link>
            </h2>
            :
            <>
              {data.length !== undefined ?
                <ProductContainer setDeleteFav={setDeleteFav} data={data} title={'Your WishList'} url={url} />
                :
                <>
                  {error ? ErrorMessage :
                    <h2 style={{ textAlign: 'center', margin: '5rem 0' }}>
                      You don't have any product added to yout wishlist, go and check some
                      <Link href='/product/all'><span style={{ color: 'red', cursor: 'pointer' }}> products!</span></Link>
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
