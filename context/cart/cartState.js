import { useReducer } from "react";
import cartContext from "./cartContext";
import cartReducer from "./cartReducer";
import Swal from 'sweetalert2'

import { ADD_CART, REMOVE_CART, CLEAR_CART, CART_LOCAL } from "types";

import clientAxios from "config/axios";
import tokenAuth from 'config/tokenAuth';

const CartState = ({ children }) => {

    const initialState = {
        items: [],
        totalQuantityCart: 0
    }

    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addItemToCartHandler = item => {
        dispatch({
            type: ADD_CART,
            payload: item
        });
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
    };

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
                removeItem: removeItemFromCartHandler,
                clearCart: clearCartHandler.apply,
                getCartLocal
            }}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartState