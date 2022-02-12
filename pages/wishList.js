import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLikedProducts } from "helpers/api-util";
import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/ProductContainer";
import Meta from "@/components/public/ui/Meta";

export default function WishList() {

  const [data, setData] = useState([])
  const [deleteFav, setDeleteFav] = useState(false)

  const router = useRouter()
  const page = router.query?.page || 1
  const sort = router.query?.sort || 'name'
  const url = '/wishList?'


  useEffect(async () => {
    await getLikedProducts(page, sort).then(resp => {
      if (resp?.ok) setData(resp)
      else {
        setData(resp)
      }
    })
  }, [page, sort])

  useEffect(async () => {
    if (deleteFav) {
      await getLikedProducts().then(resp => {
        setData(resp)
      })
      setDeleteFav(false)
    }
  }, [deleteFav])


  return (
    <Layout>
      <Meta title='WishList' />
      {data !== undefined && data !== false ?
        <ProductContainer setDeleteFav={setDeleteFav} data={data} title={'Your WishList'} url={url} />
        : (
          <h2 style={{ textAlign: 'center', margin: '5rem 0' }}>You don't have any product added to yout wishlist, go and check some <Link href='/product/all'>products!</Link></h2>
        )}
    </Layout>
  )
}

