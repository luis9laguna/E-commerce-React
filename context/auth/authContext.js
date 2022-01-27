import { createContext, useContext } from 'react'

const authContext = createContext()

export const useAuth = () => useContext(authContext);


export default authContext