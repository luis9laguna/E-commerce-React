import { useRouter } from 'next/router'
import { useEffect, useReducer } from "react";
import Cookies from 'js-cookie'
import useFetch from 'use-http'
import authContext from "./authContext";
import authReducer from "./authReducer";
import Swal from 'sweetalert2'

import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER, NO_TOKEN } from "types";

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
    const token = Cookies.get('token');
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': token }, credentials: 'include' }
    const { get, post, response, loading, error } = useFetch(`${process.env.url}`, options)

    //GET USER INFO
    useEffect(() => { userAuth() }, [])

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
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡Tu registro ha sido completado!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde'
            })
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
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡Tu ingreso ha sido exitoso!', 'success'
            )
            //REDIRECT
            if (role === 'USER_ROLE') {
                router.replace('/')
            } else if (role === 'ADMIN_ROLE' || 'SUPER_ROLE') {
                router.replace('/admin/dashboard')
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde'
            })
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
            //MODAL
            Swal.fire(
                '¡Excelente!', '¡Tu ingreso ha sido exitoso!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde'
            })
        }
    }

    const userAuth = async () => {
        if (!token) {
            dispatch({ type: NO_TOKEN })
            return
        }
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
        } else if (response.data.message === 'Token Invalid') {
            Cookies.remove('token')
        }
    }

    const updateUser = (user) => {
        dispatch({
            type: UPDATE_USER,
            payload: user
        })
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }


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