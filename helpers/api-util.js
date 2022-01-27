import clientAxios from "config/axios";

export async function getAllCategories() {
    try {
        const resp = await clientAxios.get('/category')
        const data = resp.data.categories
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function getNewestProducts() {
    try {
        const resp = await clientAxios.get('/product/newest')
        const data = resp.data.products
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts() {
    try {
        const resp = await clientAxios.get('/product')
        const data = resp.data.products
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function searchProducts(query) {
    try {
        const resp = await clientAxios.get(`/search/product/${query}`)
        const data = resp.data.results
        return data
    } catch (error) {
        console.log(error);
    }
}


export async function getProductsByCategory(slug) {
    try {
        const resp = await clientAxios.get(`/category/${slug}`)
        const data = resp.data.products
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function getProductBySlug(slug) {
    try {
        const resp = await clientAxios.get(`/product/${slug}`)
        const data = resp.data.product
        return data
    } catch (error) {
        console.log(error);
    }
}