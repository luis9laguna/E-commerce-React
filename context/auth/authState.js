import { useRouter } from 'next/router'
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import Swal from 'sweetalert2'

import { USER_AUTH, FORM_AUTH, LOG_OUT } from "types";

import clientAxios from "config/axios";
import tokenAuth from 'config/tokenAuth';

const AuthState = ({ children }) => {

    //ROUTER
    const router = useRouter()

    const initialState = {
        role: null,
        user: null,
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

            dispatch({
                type: FORM_AUTH,
                payload: {
                    role: resp.data.user.role,
                    user: resp.data.user.name,
                    token: resp.data.token
                }
            })
            //MODAL
            Swal.fire(
                'Good job!', 'LogIn succesfull!', 'success'
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
        if (token) {
            tokenAuth(token)
        }

        try {
            const resp = await clientAxios.get('/user')
            dispatch({
                type: USER_AUTH,
                payload: resp.data.user
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <authContext.Provider
            value={{
                user: state.user,
                role: state.role,
                userRegister,
                logIn,
                userAuth,
                logOut
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState