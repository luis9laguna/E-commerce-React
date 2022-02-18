import { getAllAdmins, getAllCategories, getAllProducts, getAllUsers } from 'helpers/api-util';
import { useEffect, useState } from 'react'
import styles from './Table.module.css'

const Table = () => {

    const [products, setPsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllProducts().then(resp => {
            console.log(resp)
        })
    }, []);

    const getProducts = () => {
        getAllProducts().then(resp => {
            console.log(resp)
        })
    }

    const getAdmins = () => {
        getAllCategories().then(resp => {
            console.log(resp)
        })
    }

    return (
        <div className={styles.container}>
            <div>
                <button onClick={getAdmins}>Admins</button>
                <button onClick={getUsers}>Users</button>
                <button>Create</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>createdAt</th>
                    </tr>
                </thead>
                <tbody>

                    <tr >
                        <td className={styles.tableProduct}>
                            <img src='' />
                            <span>asd</span>
                        </td>
                        <td>@gmail.com</td>
                        <td>$13123123</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Table