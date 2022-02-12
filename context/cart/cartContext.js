import { createContext, useContext } from 'react'

const cartContext = createContext()

export const useCart = () => useContext(cartContext);


export default cartContext