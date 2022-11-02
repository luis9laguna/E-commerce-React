import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetch from 'use-http'
import Layout from "@/components/public/layout/Layout";
import ContainerProduct from "@/components/public/ui/products/ContainerProduct";
import Meta from "@/components/public/ui/Meta";
import styles from '@/styles/pages/Search.module.scss'
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

const Search = () => {

    const { get, response, loading } = useFetch(`${process.env.url}`)

    const [data, setData] = useState(null)

    //PAGINATION AND PARAMETERS
    const router = useRouter()
    const search = router.query.q || ''
    const page = router.query.page || 1
    const sort = router.query.sort || 'name'

    const getSearchProducts = useCallback(async () => {

        if (search) {
            await get(`/search/${search}?page=${page}&limit=15&sort=${sort}`)
            if (response.ok) setData(response.data)
            else toast.error('¡No se han podido encontrar lo que buscabas, intente mas tarde!')
        }

    }, [get, page, response, search, sort])


    useEffect(() => { getSearchProducts() }, [page, sort, getSearchProducts])

    if (loading) return (
        <div className={styles.spinner}>
            <SyncLoader color={'#303030'} loading={loading} size={50} />
        </div>
    )

    return (
        <Layout>
            <Meta title={search} />
            {data?.products.length > 0 ?
                <ContainerProduct data={data} title={search} search={search} />
                :
                <h2>No hay resultados con &quot;{search}&quot;</h2>
            }
        </Layout>
    );
};


export default Search;
