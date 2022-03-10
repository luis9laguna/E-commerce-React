import ErrorMessage from '@/components/public/ui/ErrorMessage';
import Loading from '@/components/public/ui/Loading';
import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import styles from './BottomDashboard.module.css'

const BottomDashboard = () => {

    const [products, setProducts] = useState([]);

    //USEFETCH
    const { get, response, loading, error } = useFetch(`${process.env.url}/like/products?limit=5`)

    useEffect(() => { getLikes() }, []);

    const getLikes = async () => {
        const likes = await get()
        if (response.ok) setProducts(likes.products)
    }

    return (
        <div className={styles.containerBottom}>
            <div className={styles.containerChart}>
                asdads
            </div>
            <div className={styles.containerProducts}>
                <h2>Top 5 products more liked</h2>
                {error && <ErrorMessage />}
                {loading && !error ? <Loading space={true} />
                    :
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Likes</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, i) => (
                                <tr key={i}>
                                    <td className={styles.tableProduct}>
                                        <img src={item.image} />
                                        <span>{item.name}</span>
                                    </td>
                                    <td>{item.stock}</td>
                                    <td>{item.likes?.length}</td>
                                    <td>{item.status.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default BottomDashboard