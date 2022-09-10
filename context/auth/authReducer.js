import Cookies from 'js-cookie'
import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER, NO_TOKEN } from "types";


export default (state, action) => {
    switch (action.type) {

        case FORM_AUTH:
            Cookies.set('token', action.payload.token, { expires: 1 })
            return {
                ...state,
                userName: action.payload.user,
                ref: action.payload.ref,
                role: action.payload.role,
                isLoggedIn: true
            }

        case USER_AUTH:
            return {
                ...state,
                userName: action.payload.user,
                ref: action.payload.ref,
                role: action.payload.role,
                isLoggedIn: true,
                isLoading: false
            }
        case NO_TOKEN:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_USER:
            return {
                ...state,
                userName: action.payload
            }

        case LOG_OUT:
            Cookies.remove('token')
            return {
                ...state,
                userName: null,
                ref: null,
                role: null,
                isLoggedIn: false
            }


        default:
            return { ...state };
    }
}