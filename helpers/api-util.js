import clientAxios from "config/axios";
import tokenAuth from "config/tokenAuth";


export async function getAllCategories() {
    try {
        const resp = await clientAxios.get('/category')
        const data = resp.data.categories
        return data
    } catch (error) {
        return error.response
    }
}

export async function getNewestProducts() {
    try {
        const resp = await clientAxios.get('/product/newest')
        const data = resp.data.products
        return data
    } catch (error) {
        return error.response
    }
}

export async function getAllProducts(page, sort) {
    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/product?page=${page}&limit=15&sort=${sort}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response
    }
}

export async function searchProducts(search, page, sort) {
    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/search/product/${search}?page=${page}&limit=15&sort=${sort}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response
    }
}


export async function getProductsByCategory(slug, page, sort) {
    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/category/${slug}?page=${page}&limit=15&sort=${sort}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response
    }
}

export async function getProductBySlug(slug) {
    try {
        const resp = await clientAxios.get(`/product/${slug}`)
        const data = resp.data.product
        return data
    } catch (error) {
        return error.response
    }
}

export async function giveLikeAndDislike(slug) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.post(`/like/${slug}`)
        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function getLikedProducts(page, sort) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/like?page=${page}&limit=15&sort=${sort}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response?.data.ok
    }
}

export async function getProductsWithMoreLikes() {
    try {
        const resp = await clientAxios.get(`/like/products`)
        const data = resp.data.products
        return data
    } catch (error) {
        return error.response
    }
}

export async function getUserInfo() {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.get(`/user`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response
    }
}

export async function updateUserInfo(info) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/user/update`, info)
        const data = resp.data.user
        return data
    } catch (error) {
        return error.response
    }
}

export async function changePassword(passwords) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/auth/change-password`, passwords)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function forgetPassword(email) {
    try {
        const resp = await clientAxios.post(`/auth/password-reset`, email)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function resetPassword(password, token) {
    try {
        const resp = await clientAxios.put(`/auth/password-reset/${token}`, password)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}


export async function getStatusOrder(code) {
    try {
        const resp = await clientAxios.post(`/order/code/status`, code)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getAllOrdersByUser(page) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/order/user/all?page=${page}&limit=5`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getAddresses() {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.get(`/address`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getAddressByID(id) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.get(`/address/${id}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function postNewAddress(form) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.post(`/address`, form)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function updateAddress(id, form) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/address/${id}`, form)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function makeAddressDefault(id) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/address/default/${id}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function deleteAddress(id) {

    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.delete(`/address/${id}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}


export async function getAllUsers(page) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/user/all?page=${page}&limit=10`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getAllAdmins(page) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        if (page === undefined) page = 1

        const resp = await clientAxios.get(`/admin?page=${page}&limit=10`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function deleteUserDB(id) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.delete(`/user/${id}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function deleteAdminDB(id) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.delete(`/admin/${id}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function createAdmin(info) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.post(`/admin`, info)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function updateAdmin(id, info) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/admin/${id}`, info)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getAllOrders(page, sort) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        if (page === undefined) page = 1
        if (sort === undefined) sort = 'all'

        const resp = await clientAxios.get(`/order?page=${page}&limit=10&sort=${sort}`)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function updateOrder(id, info) {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)
    else return false

    try {
        const resp = await clientAxios.put(`/order/${id}`, info)
        const data = resp.data
        return data
    } catch (error) {
        return error.response.data
    }
}