import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/products/ProductContainer";
import Meta from "@/components/public/ui/Meta";
import Loading from "@/components/public/ui/Loading";
import ErrorMessage from '@/components/public/ui/ErrorMessage'

const Search = () => {

    const [resultProducts, setResultProducts] = useState([]);

    const router = useRouter()
    const search = router.query?.q
    const page = router.query?.page
    const sort = router.query?.sort
    const url = `/search?q=${search}&`

    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let options
    if (storage) {
        options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

    const getSearchProducts = async () => {
        const products = await get(`/search/${search}?page=${page}&limit=15&sort=${sort}`)
        if (response.ok) setResultProducts(products)
    }

    useEffect(async () => { getSearchProducts() }, [search, page, sort])

    return (
        <Layout>
            <Meta title={search} />
            {loading ? <Loading space={true} /> :
                <>
                    {resultProducts.products?.length > 0 ?
                        <ProductContainer data={resultProducts} title={search} url={url} />
                        :
                        <>
                            {error ? <ErrorMessage /> :
                                <h1 style={{ textAlign: 'center', margin: '5rem 0' }}>There aren't results with '{search || '????'}'</h1>
                            }
                        </>
                    }
                </>
            }
        </Layout>
    );
};


export default Search;
