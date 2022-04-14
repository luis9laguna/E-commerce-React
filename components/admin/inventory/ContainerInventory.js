import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Pagination from '@/components/public/ui/Pagination'
import { ArrowBack, Category, Filter } from '@material-ui/icons'
import styles from './ContainerInventory.module.css'
import TableInventory from './TableInventory'
import FormProduct from './FormProduct'
import FormCategory from './FormCategory'
import Loading from '@/components/public/ui/Loading'
import ErrorMessage from '@/components/public/ui/ErrorMessage'


const ContainerInventory = () => {

    //PAGINATION AND SORT
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [sort, setSort] = useState('true');

    //DBINVENTORY
    const [dbInventory, setDbInventory] = useState([]);
    const [inventoryUpdate, setInventoryUpdate] = useState(null);
    const [selectCategories, setSelectCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [actualGet, setActualGet] = useState('');
    const [search, setSearch] = useState('a');

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}/dashboard`, options)

    //CATEGORIES OR PRODUCTS OR FORM
    const [inCategories, setInCategories] = useState(false);
    const [inProducts, setInProducts] = useState(false);
    const [inForm, setInForm] = useState(false);

    //SEARCH PRODUCT
    useEffect(() => {
        if (search.length === 0) getProducts(1)
        else if (search.length >= 4) {
            const timeOut = setTimeout(() => {
                getSearchProducts(search, 1)
            }, 500);
        }
        return () => {
            clearTimeout(timeOut)
        };
    }, [search]);

    //CHANGE PAGINATION AND SORT
    useEffect(() => {
        if (actualGet === 'products') {
            getProducts(page)
        } else if (actualGet === 'bycategory') {
            if (selectedCategory === 'all') getProducts(page)
            else getProductsCategory(selectedCategory, page)
        } else if (actualGet === 'search') {
            getSearchProducts(page)
        }
    }, [page, sort])


    //GETS
    const getCategories = async (inside) => {
        const allCategories = await get('categories')
        if (response.ok) {

            if (inside) setSelectCategories(allCategories.categories)
            else {
                setDbInventory(allCategories.categories)
                setInProducts(false)
                setInCategories(true)
            }
        }
    }

    const getProducts = async (page) => {
        const allProducts = await get(`products?page=${page}&sort=${sort}`)
        if (response.ok) {
            setDbInventory(allProducts.products)
            setPage(allProducts.page)
            setPages(allProducts.pages)
            setInProducts(true)
            setInCategories(false)
            setActualGet("products")

            //GETTING CATEGORIES FOR THE FORM
            getCategories(true)
        }
    }

    const getProductsCategory = async (id, page) => {
        const productsByCategory = await get(`/productsbycategory/${id}?page=${page}&sort=${sort}`)
        if (response.ok) {
            setDbInventory(productsByCategory.products)
            setPage(productsByCategory.page)
            setPages(productsByCategory.pages)
            setInProducts(true)
            setInCategories(false)
            setActualGet("bycategory")
            setSelectedCategory(id)
        }
    }

    const getSearchProducts = async (page) => {
        const searchProducts = await get(`/search/${search}?page=${page}&sort=${sort}`)

        if (response.status === 200) {
            setDbInventory(searchProducts?.products)
            setPage(searchProducts?.page)
            setPages(searchProducts?.pages)
            setInProducts(true)
            setInCategories(false)
            setActualGet("search")

        } else setDbInventory([])
    }

    //BACK
    const goback = () => {
        setInCategories(false)
        setInProducts(false)
        setInForm(false)
    }

    const createBack = () => {
        setInventoryUpdate(null)
        setInForm(!inForm)
    }

    //HANDLER SELECT CATEGORY
    const selectCategory = e => {
        const id = e.target.value
        if (id === 'all') getProducts(1)
        else getProductsCategory(id, 1)
    }

    //HANDLER SELECT SORT
    const selectSort = e => setSort(e.target.value)

    //HANDLE PAGINATION    
    const handlePageClick = e => setPage(e.selected + 1)

    return (
        <div className={styles.container}>
            <h1>{inCategories && 'Categorias'}</h1>
            <h1>{inProducts && 'Productos'}</h1>
            {inCategories || inProducts ?
                <>
                    <div className={styles.containerOptions}>
                        {!inForm && <button onClick={goback}><ArrowBack />Volver</button>}
                        <button onClick={createBack}>
                            {inForm ? 'Volver' : 'Crear'}
                        </button>
                        {inProducts && !inForm &&
                            <>
                                <div>
                                    <span>Buscar</span>
                                    <input onChange={e => setSearch(e.target.value)} />
                                </div>
                                <div>
                                    <span>Categoria</span>
                                    <select id="category" onChange={selectCategory}>
                                        <option value='all'>Todos</option>
                                        {selectCategories.map((category, i) => (
                                            <option key={i} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div><div>
                                    <span>Orden</span>
                                    <select id="status" onChange={selectSort}>
                                        <option value='true'>Activo</option>
                                        <option value='false'>Inactivo</option>
                                    </select>
                                </div>
                            </>
                        }
                    </div>
                    {inForm ?
                        <>
                            {inProducts &&
                                <FormProduct
                                    selectCategories={selectCategories}
                                    inventoryUpdate={inventoryUpdate}
                                    setInForm={() => setInForm(!inForm)}
                                    getProducts={getProducts} />
                            }
                            {inCategories &&
                                <FormCategory
                                    selectCategories={selectCategories}
                                    inventoryUpdate={inventoryUpdate}
                                    setInForm={() => setInForm(!inForm)}
                                    getCategories={getCategories} />
                            }
                        </>
                        :
                        <>
                            {error ? <ErrorMessage message={response.data.message} /> :
                                <>
                                    {loading ? <Loading space={true} />
                                        :
                                        <TableInventory
                                            setInForm={() => setInForm(!inForm)}
                                            getProducts={getProducts}
                                            dbInventory={dbInventory}
                                            setInventoryUpdate={setInventoryUpdate}
                                            inCategories={inCategories}
                                            inProducts={inProducts}
                                            getCategories={getCategories} />
                                    }
                                    {dbInventory?.length === 0 || dbInventory === undefined ? <h2 style={{ textAlign: 'center' }}>Lo siento no pudimos encontrar lo que estabas buscando.</h2> : ''}
                                </>
                            }
                        </>
                    }
                </>
                :
                <div className={styles.containerButtonAU}>
                    <button onClick={() => getCategories(false)}> <Category />Categorias</button>
                    <button onClick={() => getProducts(1)}> < Filter />Productos</button>
                </div>
            }
            {inProducts && dbInventory?.length > 0 && !inForm && <Pagination page={page} pages={pages} handlePageClick={handlePageClick} />}
        </div >
    )
}

export default ContainerInventory