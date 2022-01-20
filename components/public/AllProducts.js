import styles from "@/styles/AllProducts.module.css";
import { popularProducts1 } from "../../utils/data";
import AllItemsProduct from "@/components/public/ui/AllItemsProduct";


export default function AllProducts() {
    return (
        <div>
            <h2 className={styles.title}>All Products</h2>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <span className={styles.filterText}>Filter Products:</span>
                    <select className={styles.select}>
                        <option disabled selected>Color</option>
                        <option>White</option>
                        <option>Black</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Yellow</option>
                        <option>Green</option>
                    </select>
                    <select className={styles.select}>
                        <option disabled selected>Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>XXL</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <span className={styles.filterText}>Sort Products:</span>
                    <select className={styles.select}>
                        <option selected>Newest</option>
                        <option>Price (asc)</option>
                        <option>Price (desc)</option>
                    </select>
                </div>
            </div>
            <div className={styles.products}>
                {popularProducts1.map(item => (
                    <AllItemsProduct key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}