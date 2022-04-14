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
        getCategories,
        getProducts,
        inProducts,
        setInventoryUpdate
    } = props

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { del, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //USESTATES
    const [showStock, setShowStock] = useState(false);
    const [productStock, setProductStock] = useState(null);

    //SHOW OR HIDE MODAL ABOUT US
    const handlerShowStock = () => setShowStock(!showStock);

    const editSelect = item => {
        setInventoryUpdate(item)
        setInForm()
    }

    const deleteSelect = id => {
        let route = "category"
        if (inProducts) route = "product"
        //MODAL CONFIRMATION
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Una vez eliminado, no seras capaz de recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                await del(`/${route}/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    )
                    //FETCH NEW DATA
                    if (inProducts) getProducts(1)
                    else getCategories()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, intente mas tarde.'
                    })
                }
            }
        })
    }

    //STOCK
    const stockSelect = (id, name) => {
        setProductStock({ id, name })
        handlerShowStock()
    }

    const updateStock = async stock => {
        await put(`product/stock/${productStock.id}`, { stock })
        if (response.ok) {
            Swal.fire(
                '¡Excelente!',
                'El stock ha sido actualizado correctamente',
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

    return (

        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th>Nombre</th>
                        {inProducts &&
                            <>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Costo</th>
                                <th>Stock</th>
                                <th>Me gusta</th>
                            </>
                        }
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dbInventory?.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <div className={styles.tableProduct}>
                                    <img src={inProducts ? item.images[0] : item.image} />
                                    <span>{item.name}</span>
                                </div>
                            </td>
                            {inProducts &&
                                <>
                                    <td>
                                        <div className={styles.tableCategory}>
                                            <span>{item.category.name}</span>
                                            <span className={styles.status}>{item.category.status.toString()}</span>
                                        </div>
                                    </td>
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
                        <h2>Agregar o restar stock de</h2>
                        <h1>"{productStock.name}"</h1>
                        <input
                            type='number'
                            id='stock'
                        />
                        <button>
                            {loading ? <Loading light={true} /> : 'Actualizar Stock'}
                        </button>
                        {error && <ErrorMessage />}
                    </form>
                </Modal>
            }
        </div>
    )
}

export default TableInventory