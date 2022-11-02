import Pagination from '@/components/public/ui/Pagination'
import { useCallback, useEffect, useState } from 'react'
import useFetch from 'use-http'
import FormProduct from './FormProduct'
import styles from '../category/ContainerCategories.module.scss'
import { MdModeEditOutline, MdOutlineArchive, MdRemoveCircleOutline } from 'react-icons/md'
import { SyncLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import FormStock from './FormStock'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const ContainerProducts = () => {

    //USEFETCH
    const options = {
        cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') }
    }
    const { get, del, response, loading } = useFetch(`${process.env.url}`, options)

    const [data, setData] = useState({
        page: 1,
        pages: 0,
        inventory: [],
        sort: true,
        selectedCategory: 'all',
        actualGet: ''
    })

    const [selectCategories, setSelectCategories] = useState([]);
    const [productUpdate, setProductUpdate] = useState(null);
    const [search, setSearch] = useState('');

    //FORMS
    const [showStock, setShowStock] = useState(false);
    const [formActive, setFormActive] = useState(false);

    useEffect(() => getCategories(), [getCategories])

    //CHANGE PAGINATION AND SORT
    useEffect(() => {
        if (search !== '') {

            if (search.length > 3) {
                const timeOut = setTimeout(() => {
                    getSearchProducts(search, data.page, data.sort)
                }, 1000);
            }
            return () => clearTimeout(timeOut);

        } else if (data.selectedCategory !== 'all') {
            getProductsCategory(data.selectedCategory, data.page, data.sort)
        } else {
            getProducts(data.page, data.sort)
        }

    }, [data.page, data.selectedCategory, data.sort, search, getProducts, getProductsCategory, getSearchProducts])


    const getCategories = useCallback(async () => {

        const resp = await fetch(`${process.env.url}/dashboard/categories`, { credentials: 'include', headers: { 'Authorization': Cookies.get('token') } })
        const result = await resp.json()

        if (result.ok) {
            setSelectCategories(result.categories)
        } else {
            toast.error('¡No se han podido obtener las categorias, intente mas tarde!')
        }
    }, [])


    const getProducts = useCallback(async (page, sort) => {
        await get(`/dashboard/products?page=${page}&sort=${data.sort}`)
        if (response.ok) {
            const { products, page, pages } = response.data
            setData(prev => ({ ...prev, inventory: products, page, pages, selectedCategory: 'all', actualGet: 'products' }))
        } else {
            toast.error('¡No se han podido obtener los productos, intente mas tarde!')
        }
    }, [data.sort, get, response])


    const getProductsCategory = useCallback(async (id, page, sort) => {
        await get(`/dashboard/productsbycategory/${id}?page=${page}&sort=${sort}`)
        if (response.ok) {
            const { products, page, pages } = response.data
            setData(prev => ({ ...prev, inventory: products, page, pages, selectedCategory: id, actualGet: 'bycategory' }))
        } else {
            toast.error('¡No se han podido obtener los productos, intente mas tarde!')
        }
    }, [get, response])


    const getSearchProducts = useCallback(async (search, page, sort) => {
        await get(`dashboard/search/${search}?page=${page}&sort=${sort}`)
        if (response.ok) {
            const { products, page, pages } = response.data
            setData(prev => ({ ...prev, inventory: products, page, pages, actualGet: 'search' }))
        } else {
            toast.error('¡No se han podido obtener los productos, intente mas tarde!')
        }
    }, [get, response])

    const selectCategory = e => setData(prev => ({ ...prev, selectedCategory: e.target.value }));
    const selectSort = e => setData(prev => ({ ...prev, sort: e.target.value }))
    const handlePageClick = e => setData(prev => ({ ...prev, page: e.selected + 1 }))

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
                await del(`/product/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    )
                    //FETCH NEW DATA
                    getProducts(1)
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

    const editSelected = (item, stock) => {
        setProductUpdate(item)
        if (stock) setShowStock(true)
        else setFormActive(true)
    }

    return (
        <>
            {loading && !data ? <div className={styles.loader}><SyncLoader color='#303030' size={50} /></div> :
                <div className={styles.container}>
                    <h1>Productos</h1>
                    <div className={styles.containerOptions}>
                        <button onClick={() => setFormActive(true)}>Crear</button>
                        <div>
                            <label htmlFor='search'>Buscar</label>
                            <input name="search" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='category'>Categoria</label>
                            <select name='category' id="category" value={data.selectedCategory} onChange={selectCategory}>
                                <option value='all'>Todos</option>
                                {selectCategories.map((category, i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='status'>Orden</label>
                            <select name='status' id="status" onChange={selectSort}>
                                <option value='true'>Activo</option>
                                <option value='false'>Inactivo</option>
                            </select>
                        </div>
                    </div>
                    {loading ? <div className={styles.loader}><SyncLoader color='#303030' size={50} /></div> :
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tr}>
                                        <th>Nombre</th>
                                        <th>Categoria</th>
                                        <th>Precio</th>
                                        <th>Costo</th>
                                        <th>Stock</th>
                                        <th>Likes</th>
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.inventory.map((item, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className={styles.tableProduct}>
                                                    <img src={item.images[0]} />
                                                    <span>{item.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.tableCategory}>
                                                    <span>{item.category.name}</span><br />
                                                    <span className={styles.status}>{item.category.status ? 'true' : 'false'}</span>
                                                </div>
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.likes?.length}</td>
                                            <td>{item.status.toString()}</td>
                                            <td>
                                                <div className={styles.options}>
                                                    <button onClick={() => editSelected(item)}><MdModeEditOutline /></button>
                                                    <button onClick={() => deleteSelected(item._id)}><MdRemoveCircleOutline /></button>
                                                    <button className={styles.stock} onClick={() => editSelected(item, true)}><MdOutlineArchive /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                    {formActive && <FormProduct getProducts={getProducts} setFormActive={setFormActive} selectCategories={selectCategories} productUpdate={productUpdate} setProductUpdate={setProductUpdate} />}
                    {data.pages > 1 && <Pagination page={data.page} pages={data.pages} handlePageClick={handlePageClick} />}
                    {showStock && <FormStock setShowStock={setShowStock} setProductUpdate={setProductUpdate} productUpdate={productUpdate} getProducts={getProducts} />}
                </div>
            }
        </>
    )
}

export default ContainerProducts