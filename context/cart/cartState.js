import { useReducer } from "react";
import useFetch from 'use-http'
import cartContext from "./cartContext";
import cartReducer from "./cartReducer";
import Swal from 'sweetalert2'

import { ADD_CART, SUBTRACT_CART, REMOVE_CART, CLEAR_CART, CART_LOCAL } from "types";

const CartState = ({ children }) => {

    const initialState = {
        items: [],
        totalQuantityCart: 0
    }

    const [state, dispatch] = useReducer(cartReducer, initialState)

    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let options
    if (storage) {
        options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    const addItemToCartHandler = item => {
        dispatch({
            type: ADD_CART,
            payload: item
        });
        if (!item.cart) {
            Swal.fire({
                title: item.name,
                text: `'${item.quantity}' has been added succesfully to your cart`,
                imageUrl: item.image,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: item.name,
                timer: 2000,
                timerProgressBar: true
            })
        }
    };

    const subtractItemFromCartHandler = slug => {
        dispatch({
            type: SUBTRACT_CART,
            payload: slug
        });
    }

    const removeItemFromCartHandler = slug => {
        dispatch({
            type: REMOVE_CART,
            payload: slug
        });
    }

    const clearCartHandler = () => {
        dispatch({ type: CLEAR_CART })
    }

    const getCartLocal = () => {
        dispatch({ type: CART_LOCAL })
    }


    return (
        <cartContext.Provider
            value={{
                items: state.items,
                totalQuantityCart: state.totalQuantityCart,
                addItem: addItemToCartHandler,
                subtractItem: subtractItemFromCartHandler,
                removeItem: removeItemFromCartHandler,
                clearCart: clearCartHandler,
                getCartLocal
            }}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartState