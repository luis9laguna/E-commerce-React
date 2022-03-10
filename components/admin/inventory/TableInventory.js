import { useState } from 'react'
import useFetch from 'use-http'
import Modal from '@/components/public/ui/Modal';
import { ArchiveOutlined, EditOutlined, RemoveCircleOutlined } from '@material-ui/icons';
import styles from '@/styles/ui/Tables.module.css'
import Swal from 'sweetalert2';
import Loading from '@/components/public/ui/Loading';
import ErrorMessage from '@/components/public/ui/ErrorMessage';

const TableInventory = (props) => {

    const {
        setInForm,
        dbInventory,
        getProducts,
        inProducts,
        setInventoryUpdate
    } = props

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //USESTATES
    const [showStock, setShowStock] = useState(false);
    const [productStock, setProductStock] = useState(null);

    //SHOW OR HIDE MODAL ABOUT US
    const handlerShowStock = () => setShowStock(!showStock);

    const editSelect = user => {
        setInventoryUpdate(user)
        setInForm()
    }

    const deleteSelect = id => {
        console.log(id)
    }

    //STOCK
    const stockSelect = (id, name) => {
        setProductStock({
            id,
            name
        })
        handlerShowStock()
    }

    const updateStock = async stock => {
        await put(`product/stock/${productStock.id}`, { stock })
        if (response.ok) {
            Swal.fire(
                'Good job!',
                'The stock has been updated Succesfully',
                'success'
            )
            getProducts(1)
            handlerShowStock()
        }
    }

    const handlerFormSubmit = e => {
        e.preventDefault()
        const stock = e.target.stock.value
        updateStock(stock)
    }
    console.log(dbInventory)

    return (

        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th>Name</th>
                        {inProducts &&
                            <>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Stock</th>
                                <th>Likes</th>
                            </>
                        }
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {dbInventory?.map((item, i) => (
                        <tr key={i}>
                            <td className={styles.tableProduct}>
                                {inProducts ? '' : <img src={item.image} />}
                                <span>{item.name}</span>
                            </td>
                            {inProducts &&
                                <>
                                    <td>{item.category[0].name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.likes?.length}</td>
                                </>
                            }
                            <td>{item.status.toString()}</td>
                            <td>
                                <div className={styles.options}>
                                    <button onClick={() => editSelect(item)}><EditOutlined /></button>
                                    <button onClick={() => deleteSelect(item._id)}><RemoveCircleOutlined /></button>
                                    {inProducts && <button onClick={() => stockSelect(item._id, item.name)}><ArchiveOutlined /></button>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showStock &&
                <Modal onClose={handlerShowStock}>
                    <form onSubmit={handlerFormSubmit} className={styles.form}>
                        <h2>Add or substract stock from </h2>
                        <h1>"{productStock.name}"</h1>
                        <input
                            type='number'
                            id='stock'
                        />
                        <button>
                            {loading ? <Loading light={true} /> : 'Update Stock'}
                        </button>
                        {error && <ErrorMessage />}
                    </form>
                </Modal>
            }
        </div>
    )
}

export default TableInventory