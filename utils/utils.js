import jwt from 'jsonwebtoken';
import { regiones, provincias, comunas } from './addressInfo'

const formatImages = (image) => {
    const imageArray = image.split('/')
    imageArray.splice(6, 0, 'c_scale,w_350')
    return imageArray.join('/')
}


const formatCurrency = (dataCurrency) => {
    const data = new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(dataCurrency)
    return data
}

const getAddressMap = (code) => {

    if (code?.length === 2) {
        return regiones.find(region => region.codigo === code)?.nombre
    } else if (code?.length === 3) {
        return provincias.find(provincia => provincia.codigo === code)?.nombre
    } else {
        return comunas.find(comuna => comuna.codigo === code)?.nombre
    }
}

const totalCart = (items, withShipping) => {
    const arrayTotalPriceItem = items?.map(item => (
        item.price * item.quantity
    ))
    const total = arrayTotalPriceItem?.reduce((a, b) => a + b, 0)

    if (withShipping) return formatCurrency(total + 3500)
    else return formatCurrency(total)
}

const decryptJWT = (data) => {
    const dataDecrypted = jwt.verify(data, process.env.SECRET_DATA_KEY);
    return dataDecrypted;
}


const encryptJWT = (data) => {
    const dataencrypted = jwt.sign(data, process.env.SECRET_DATA_KEY, {
        expiresIn: '5m'
    })
    return dataencrypted;
}





export { formatImages, formatCurrency, getAddressMap, totalCart, decryptJWT, encryptJWT }