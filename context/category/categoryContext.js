import { createContext, useContext } from 'react'

const categoryContext = createContext()

export const useCategory = () => useContext(categoryContext);


export default categoryContext