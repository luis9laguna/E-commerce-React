import axios from 'axios'

const clientAxios = axios.create({
    baseURL: process.env.url
})

export default clientAxios