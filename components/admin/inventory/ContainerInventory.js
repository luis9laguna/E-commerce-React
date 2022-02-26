import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Pagination from '@/components/public/ui/Pagination'
import { ArrowBack, Category, Filter } from '@material-ui/icons'
import styles from './ContainerInventory.module.css'
import TableInventory from './TableInventory'
import FormProduct from './FormProduct'
import FormCategory from './FormCategory'


const ContainerInventory = () => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //DBINVENTORY
    const [dbInventory, setDbInventory] = useState([]);
    const [inventoryUpdate, setInventoryUpdate] = useState(null);
    const [selectCategories, setSelectCategories] = useState([]);
    const [search, setSearch] = useState('a');

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

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


    const getCategories = async () => {
        const allCategories = await get('category')
        if (response.ok) {
            setDbInventory(allCategories.categories)
            setInProducts(false)
            setInCategories(true)
        }
    }

    const getProducts = async (page) => {
        const allProducts = await get(`product?page=${page}`)
        if (response.ok) {
            setDbInventory(allProducts.products)
            setPage(allProducts.page)
            setPages(allProducts.pages)
            setInProducts(true)
            setInCategories(false)

            //GETTING CATEGORIES FOR THE FORM
            const allCategories = await get('category')
            if (response.ok) setSelectCategories(allCategories.categories)
        }
    }

    const getProductsCategory = async (slug, page) => {
        const productsByCategory = await get(`/category/${slug}?page=${page}`)
        if (response.ok) {
            setDbInventory(productsByCategory.products)
            setPage(productsByCategory.page)
            setPages(productsByCategory.pages)
            setInProducts(true)
            setInCategories(false)
        }
    }

    const getSearchProducts = async (search, page) => {
        const searchProducts = await get(`/search/product/${search}?page=${page}`)
        if (response.ok) {
            setDbInventory(searchProducts.products)
            setPage(searchProducts.page)
            setPages(searchProducts.pages)
            setInProducts(true)
            setInCategories(false)
        } else {
            setDbInventory(null)
        }
    }


    const goback = () => {
        setInCategories(false)
        setInProducts(false)
        setInForm(false)
    }

    const createBack = () => {
        setInventoryUpdate(null)
        setInForm(!inForm)
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)
        getProducts(selectedPage + 1)
    }

    const selectCategory = e => {
        const slug = e.target.value
        if (slug === 'all') {
            getProducts(1)
        } else {
            getProductsCategory(slug, 1)
        }
    }

    return (
        <div className={styles.container}>
            <h1>{inCategories ? 'Categories' : ''}</h1>
            <h1>{inProducts ? 'Products' : ''}</h1>
            {inCategories || inProducts ?
                <>
                    <div className={styles.containerOptions}>
                        {inForm ? '' : <button onClick={goback}><ArrowBack />Back</button>}
                        <button onClick={createBack}>
                            {inForm ? 'Back' : 'Create'}
                        </button>
                        {inProducts && !inForm ?
                            <>
                                <div>
                                    <span>Search</span>
                                    <input onChange={e => setSearch(e.target.value)} />
                                </div>
                                <div>
                                    <span>Filter by category</span>
                                    <select id="status" onChange={selectCategory}>
                                        <option selected="true" value='all'>All</option>
                                        {selectCategories.map((category, i) => (
                                            <option key={i} value={category.slug}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                            : ''}
                    </div>
                    {inForm ?
                        <>
                            {inProducts ?
                                <FormProduct
                                    selectCategories={selectCategories}
                                    inventoryUpdate={inventoryUpdate}
                                    setInForm={() => setInForm(!inForm)}
                                    getProducts={getProducts} />
                                : ''
                            }
                            {inCategories ?
                                <FormCategory
                                    selectCategories={selectCategories}
                                    inventoryUpdate={inventoryUpdate}
                                    setInForm={() => setInForm(!inForm)}
                                    getCategories={getCategories} />
                                : ''
                            }
                        </>
                        :
                        <>
                            {error ?
                                <h2 style={{ textAlign: 'center' }}>Sorry but we couldn't find what you were looking for.</h2>
                                :
                                <TableInventory
                                    setInForm={() => setInForm(!inForm)}
                                    getProducts={getProducts}
                                    dbInventory={dbInventory}
                                    setInventoryUpdate={setInventoryUpdate}
                                    inCategories={inCategories}
                                    inProducts={inProducts} />
                            }
                        </>
                    }
                </>
                :
                <div className={styles.containerButtonAU}>
                    <button onClick={getCategories}> <Category /> Categories</button>
                    <button onClick={() => getProducts(1)}> < Filter /> Products</button>
                </div>
            }
            {inProducts && dbInventory !== null && !inForm ? <Pagination page={page} pages={pages} handlePageClick={handlePageClick} /> : ''}
        </div >
    )
}

export default ContainerInventory