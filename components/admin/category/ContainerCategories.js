import { useCallback, useEffect, useState } from 'react'
import useFetch from 'use-http'
import FormCategory from './FormCategory'
import styles from './ContainerCategories.module.scss'
import { MdModeEditOutline, MdOutlineArchive, MdRemoveCircleOutline } from 'react-icons/md'
import Swal from 'sweetalert2';
import { SyncLoader } from 'react-spinners'


const ContainerCategories = () => {


    const [dbInventory, setDbInventory] = useState([]);
    const [sort, setSort] = useState('true');
    const [categoryUpdate, setCategoryUpdate] = useState(null);
    const [formActive, setFormActive] = useState(false);

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include' }
    const { get, del, response, loading } = useFetch(`${process.env.url}`, options)


    const getCategories = useCallback(async () => {
        await get(`/dashboard/categories?sort=${sort}`)
        if (response.ok) {
            setDbInventory(response.data.categories)
        } else {
            toast.error('¡No se han podido obtener las categorias, intente mas tarde!')
        }
    }, [response, sort, get])

    useEffect(() => { getCategories() }, [sort, getCategories])

    const deleteSelected = id => {
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
                await del(`/category/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    )
                    //FETCH NEW DATA
                    getCategories()
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

    const editSelected = item => {
        setCategoryUpdate(item)
        setFormActive(true)
    }

    return (
        <>
            {loading ? <div className={styles.loader}><SyncLoader color='#303030' size={50} /></div> :
                <div className={styles.container}>
                    <h1>Categorias</h1>
                    <div className={styles.containerOptions}>
                        <button onClick={() => setFormActive(true)}>Crear</button>
                        <div>
                            <label htmlFor='status'>Orden</label>
                            <select name='status' value={sort} id="status" onChange={(e) => setSort(e.target.value)}>
                                <option value='true'>Activo</option>
                                <option value='false'>Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbInventory?.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className={styles.tableProduct}>
                                                <img src={item.image} />
                                                <span>{item.name}</span>
                                            </div>
                                        </td>
                                        <td>{item.status.toString()}</td>
                                        <td>
                                            <div className={styles.options}>
                                                <button onClick={() => editSelected(item)}><MdModeEditOutline /></button>
                                                <button onClick={() => deleteSelected(item._id)}><MdRemoveCircleOutline /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {formActive && <FormCategory setFormActive={setFormActive} categoryUpdate={categoryUpdate} getCategories={getCategories} setCategoryUpdate={setCategoryUpdate} />}
                </div>
            }
        </>

    )
}

export default ContainerCategories