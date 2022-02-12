import { USER_AUTH, FORM_AUTH, LOG_OUT, UPDATE_USER } from "types";


export default (state, action) => {
    switch (action.type) {

        case FORM_AUTH:
            localStorage.setItem('token', action.payload.token)
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
                isLoggedIn: true

            }
        case UPDATE_USER:
            return {
                ...state,
                userName: action.payload
            }

        case LOG_OUT:
            localStorage.removeItem('token')
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