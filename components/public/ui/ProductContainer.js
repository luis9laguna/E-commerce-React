import styles from "@/styles/ui/AllProducts.module.css";
import AllItemsProduct from "@/components/public/ui/AllItemsProduct";


export default function ProductContainer({ products, title }) {
    return (
        <div>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <span className={styles.filterText}>Sort Products:</span>
                    <select className={styles.select}>
                        <option selected>Popularity</option>
                        <option>Newest</option>
                        <option>Price (asc)</option>
                        <option>Price (desc)</option>
                    </select>
                </div>
            </div>
            <div className={styles.products}>
                {products.map(product => (
                    <AllItemsProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}