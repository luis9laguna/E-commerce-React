import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/ProductContainer";
import { searchProducts } from "helpers/api-util";
import Meta from "@/components/public/ui/Meta";

const Search = () => {

    const [resultProducts, setResultProducts] = useState(false);

    const router = useRouter()
    const search = router.query?.q
    const page = router.query?.page || 1
    const sort = router.query?.sort || 'name'
    const url = `/search?q=${search}&`

    useEffect(async () => {
        if (search !== undefined) {
            await searchProducts(search, page, sort).then(resp => {
                if (resp.ok) {
                    setResultProducts(resp)
                } else {
                    setResultProducts(false)
                }
            });
        }
    }, [search, page, sort])


    return (
        <Layout>
            <Meta title={search} />

            {resultProducts ?
                <ProductContainer data={resultProducts} title={search} url={url} />
                :
                <h1 style={{ textAlign: 'center', margin: '5rem 0' }}>There aren't results with '{search || '????'}'</h1>
            }
        </Layout>
    );
};


export default Search;
