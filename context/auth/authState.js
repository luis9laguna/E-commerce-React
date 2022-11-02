import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer } from "react";
import useFetch from 'use-http'
import authContext from "./authContext";
import authReducer from "./authReducer";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'

import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER } from "utils/types";

const AuthState = ({ children }) => {


    //ROUTER
    const router = useRouter()
    const initialState = {
        role: null,
        userName: null,
        isLoggedIn: false,
        ref: null,
        isLoading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { get, post, response, loading } = useFetch(`${process.env.url}`, options)

    const userAuth = useCallback(async () => {

        if (!Cookies.get('token')) {
            logOut();
            return;
        }

        console.log(Cookies.get('token'))

        await get(`user`)
        if (response.ok) {
            dispatch({
                type: USER_AUTH,
                payload: {
                    role: response.data.user.role,
                    user: response.data.user.name,
                    ref: response.data.user.ref,
                }
            })
        } else logOut()

    }, [response, get])

    //GET USER INFO
    useEffect(() => { userAuth() }, [userAuth])


    const userRegister = async data => {
        await post('user', data)
        if (response.ok) {
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: response.data.user.role,
                    user: response.data.user.name,
                    ref: response.data.user.ref,
                    token: response.data.token
                }
            })
            toast.success('¡Te has registrado exitosamente!')
            router.push('/')
        } else {
            toast.error('Ha ocurrido un error, intente mas tarde')
        }
    }


    const logIn = async data => {
        await post('auth/login', data)

        if (response.ok) {
            const role = response.data.user.role
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role,
                    user: response.data.user.name,
                    ref: response.data.user.ref,
                    token: response.data.token
                }
            })
            Cookies.set('tokensfdsdfs', response.data.token, { expires: 1 })

            toast.success('Has ingresado exitosamente!')
            //REDIRECT
            if (role === 'ADMIN_ROLE' || role === 'SUPER_ROLE') {
                router.push('/admin')
            }
        } else {
            toast.error('Ha ocurrido un error, intente mas tarde')
        }
    }

    const logInGoogle = async token => {
        await post('auth/google', token)
        if (response.ok) {
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: response.data.user.role,
                    user: response.data.user.name,
                    ref: response.data.user.ref,
                    token: response.data.token
                }
            })
            toast.success('Has ingresado exitosamente!')
            router.push('/')
        } else {
            toast.error('Ha ocurrido un error, intente mas tarde')
        }
    }



    const updateUser = (user) => {
        dispatch({
            type: UPDATE_USER,
            payload: user
        })
    }

    const logOut = () => dispatch({ type: LOG_OUT });



    return (
        <authContext.Provider
            value={{
                userName: state.userName,
                isLoggedIn: state.isLoggedIn,
                role: state.role,
                ref: state.ref,
                isLoading: state.isLoading,
                fetchLoading: loading,
                userRegister,
                logIn,
                logInGoogle,
                userAuth,
                updateUser,
                logOut,
            }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState