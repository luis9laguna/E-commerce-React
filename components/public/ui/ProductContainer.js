import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AllItemsProduct from "@/components/public/ui/AllItemsProduct";
import styles from "@/styles/ui/ProductContainer.module.css";
import Pagination from "./Pagination";

const ProductContainer = ({ data, title, setDeleteFav, url }) => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //PRODUCTS
    const [products, setProducts] = useState([])

    //QUERY PARAMETERS
    const [currentPage, setCurrentPage] = useState(null)
    const [currentSort, setCurrentSort] = useState(null)
    const [currentSearch, setCurrentSearch] = useState(null)

    const router = useRouter()

    //SETTING VALUES FOR CURRENT PARAMS
    useEffect(() => {
        setCurrentPage(router.query.page)
        setCurrentSort(router.query.sort)
        setCurrentSearch(router.query.q)
    }, [router.query])

    //SETTING VALUES FROM EVERY FETCH
    useEffect(() => {
        setProducts(data.products)
        setPage(data.page)
        setPages(data.pages)

    }, [data]);

    const handlePageClick = e => {
        const selectedPage = e.selected

        if (currentSort) {
            router.push(`${url}page=${selectedPage + 1}&sort=${currentSort}`)
        } else if (currentSearch) {
            router.push(`${url}page=${selectedPage + 1}`)
        } else if (currentSearch && currentSort) {
            router.push(`${url}page=${selectedPage + 1}&sort=${currentSort}`)
        } else {
            router.push(`${url}page=${selectedPage + 1}`)
        }
    }

    const handlerSortProducts = e => {
        const selectedSort = e.target.value

        if (currentPage) {
            router.push(`${url}page=${currentPage}&sort=${selectedSort}`)
        } else if (currentSearch) {
            router.push(`${url}sort=${selectedSort}`)
        } else if (currentSearch && currentPage) {
            router.push(`${url}page=${currentPage}&sort=${selectedSort}`)
        } else {
            router.push(`${url}sort=${selectedSort}`)
        }
    }

    return (
        <div className={styles.productContainer}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.sortContainer}>
                <div className={styles.sort}>
                    <span className={styles.sortText}>Sort Products: </span>
                    <select className={styles.select} onChange={handlerSortProducts}>
                        <option value='name'>Name</option>
                        <option value='popularity'>Popularity</option>
                        <option value='newest'>Newest</option>
                        <option value='priceAsc'>Price(asc)</option>
                        <option value='priceDesc'>Price(desc)</option>
                    </select>
                </div>
            </div>

            <div className={styles.products}>
                {
                    products?.map(product => (
                        <AllItemsProduct key={product._id} product={product} setDeleteFav={setDeleteFav} />
                    ))
                }
            </div>
            {products !== undefined &&
                <Pagination page={page} pages={pages} handlePageClick={handlePageClick} />
            }
        </div>
    )
}

export default ProductContainer
