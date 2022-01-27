import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/public/layout/Layout";
import ProductContainer from "@/components/public/ui/ProductContainer";
import AllItemsProduct from "@/components/public/ui/AllItemsProduct";
import { searchProducts } from "helpers/api-util";

const Search = () => {

    const [resultProducts, setResultProducts] = useState([]);

    const router = useRouter()
    const query = router.query.q

    useEffect(async () => {
        const result = await searchProducts(query);
        setResultProducts(result)
    }, [query])

    return (
        <Layout>
            <ProductContainer products={resultProducts} title={query} />
        </Layout>
    );
};


export default Search;
