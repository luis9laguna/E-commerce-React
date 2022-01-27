import clientAxios from "./axios";

const tokenAuth = token => {
    if (token) {
        clientAxios.defaults.headers.common['Authorization'] = token
    } else {
        delete clientAxios.defaults.headers.common['Authorization']
    }
}

export default tokenAuth