import { useRouter } from 'next/router'
import { useReducer, useState } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import Swal from 'sweetalert2'

import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER } from "types";

import clientAxios from "config/axios";
import tokenAuth from 'config/tokenAuth';

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

    const userRegister = async data => {
        try {
            const resp = await clientAxios.post('/user', data)
            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: resp.data.user.role,
                    user: resp.data.user.name,
                    ref: resp.data.user.ref,
                    token: resp.data.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'Your registration is completed!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }

    const logIn = async data => {
        try {
            const resp = await clientAxios.post('/auth/login', data)

            const role = resp.data.user.role

            dispatch({
                type: FORM_AUTH,
                payload: {
                    role,
                    user: resp.data.user.name,
                    ref: resp.data.user.ref,
                    token: resp.data.token
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
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }

    const logInGoogle = async token => {
        try {
            const resp = await clientAxios.post('/auth/google', token)

            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: resp.data.user.role,
                    user: resp.data.user.name,
                    ref: resp.data.user.ref,
                    token: resp.data.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'LogIn successful!', 'success'
            )
            //REDIRECT
            router.replace('/')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }

    const userAuth = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoadingUser(false)
            return
        }
        try {
            tokenAuth(token)
            const resp = await clientAxios.get('/user')

            dispatch({
                type: USER_AUTH,
                payload: {
                    role: resp.data.user.role,
                    user: resp.data.user.name,
                    ref: resp.data.user.ref,
                }
            })
        } catch (error) {
            const errorMessage = error.response?.data.message
            if (errorMessage === 'Token Invalid') {
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
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState