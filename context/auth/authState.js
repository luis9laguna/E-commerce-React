import { useRouter } from 'next/router'
import { useReducer, useState } from "react";
import useFetch from 'use-http'
import authContext from "./authContext";
import authReducer from "./authReducer";
import Swal from 'sweetalert2'

import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER } from "types";

const AuthState = ({ children }) => {

    const [loadingUser, setLoadingUser] = useState(true)

    //ROUTER
    const router = useRouter()

    const initialState = {
        role: null,
        userName: null,
        isLoggedIn: false,
        ref: null,
        loading: false
    }
    const [state, dispatch] = useReducer(authReducer, initialState)


    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let token
    if (storage) token = localStorage.getItem('token')
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': token } }
    const { get, post, response, loading, error } = useFetch(`${process.env.url}`, options)

    const userRegister = async data => {
        const resp = await post('user', data)
        if (response.ok) {
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: resp.user.role,
                    user: resp.user.name,
                    ref: resp.user.ref,
                    token: resp.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'Your registration is completed!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            })
        }
    }


    const logIn = async data => {
        const resp = await post('auth/login', data)

        if (response.ok) {
            const role = resp.user.role
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role,
                    user: resp.user.name,
                    ref: resp.user.ref,
                    token: resp.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'LogIn succesfull!', 'success'
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
                text: response.data.message,
            })
        }
    }

    const logInGoogle = async token => {
        const resp = await post('auth/google', token)

        if (response.ok) {
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: resp.user.role,
                    user: resp.user.name,
                    ref: resp.user.ref,
                    token: resp.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'LogIn successful!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            })
        }
    }

    const userAuth = async () => {
        let resp
        if (token !== null) resp = await fetch(`${process.env.url}/user`, { headers: { 'Authorization': token } })
        const data = await resp?.json()
        if (data?.ok) {
            dispatch({
                type: USER_AUTH,
                payload: {
                    role: data.user?.role,
                    user: data.user?.name,
                    ref: data.user?.ref,
                }
            })
        } else {
            if (data?.message === 'Token Invalid') {
                localStorage.removeItem('token')
            }
        }
        setLoadingUser(false)
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
                userRegister,
                logIn,
                logInGoogle,
                userAuth,
                updateUser,
                logOut,
                loadingUser,
            }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState