import { USER_AUTH, FORM_AUTH, LOG_OUT } from "types";


export default (state, action) => {
    switch (action.type) {

        case FORM_AUTH:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                role: action.payload.role
            }

        case USER_AUTH:
            return {
                ...state,
                user: action.payload.name,
                role: action.payload.role
            }

        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                role: null
            }

        default:
            return state;
    }
}