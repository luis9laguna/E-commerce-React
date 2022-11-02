import { useRouter } from "next/router";
import AllItemsProduct from "@/components/public/ui/products/AllItemsProduct";
import styles from "@/styles/ui/product/ProductContainer.module.scss";
import Pagination from "../Pagination";

const ContainerProduct = ({ data, title, setDeleteFav, search }) => {

    const router = useRouter()
    const actualSort = router.query.sort || 'name'

    const handlePageClick = e => {

        if (search) {
            router.push({ query: { q: search, sort: actualSort, page: e.selected } })
        } else {
            router.push({ query: { sort: actualSort, page: e.selected } })
        }
    }

    const handlerSortProducts = e => {

        if (search) {
            router.push({ query: { q: search, sort: e.target.value, page: data.page } })
        } else {
            router.push({ query: { sort: e.target.value, page: data.page } })
        }
    }

    return (
        <div className={styles.productContainer}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.sortContainer}>
                <span>Ordenar productos: </span>
                <select value={actualSort} onChange={handlerSortProducts}>
                    <option value='name'>Nombre</option>
                    <option value='popularity'>Popularidad</option>
                    <option value='newest'>Mas nuevo</option>
                    <option value='priceAsc'>Precio(asc)</option>
                    <option value='priceDesc'>Precio(desc)</option>
                </select>
            </div>

            <div className={styles.products}>
                {
                    data.products.map(product => (
                        <AllItemsProduct key={product._id} product={product} setDeleteFav={setDeleteFav} />
                    ))
                }
            </div>
            {data.pages.length > 1 && <Pagination page={data.page} pages={data.pages} handlePageClick={handlePageClick} />}
        </div>
    )
}

export default ContainerProduct
