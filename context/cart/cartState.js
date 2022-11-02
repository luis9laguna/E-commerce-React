import { useEffect, useReducer } from "react";
import Cookies from 'js-cookie'
import cartContext from "./cartContext";
import cartReducer from "./cartReducer";
import { toast } from 'react-toastify'

import { ADD_CART, SUBTRACT_CART, REMOVE_CART, CLEAR_CART, CART_LOCAL } from "utils/types";

const initialState = {
    items: [],
    totalQuantityCart: 0
}

const CartState = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)

    useEffect(() => { getCart() }, []);
    useEffect(() => Cookies.set('cart', JSON.stringify(state.items)), [state]);

    const getCart = () => {
        try {
            const cookiesProducts = JSON.parse(Cookies.get('cart')) || []
            dispatch({ type: CART_LOCAL, payload: cookiesProducts })
        } catch (error) {
            dispatch({ type: CART_LOCAL, payload: [] })
        }
    }

    const addItemToCartHandler = product => {
        dispatch({
            type: ADD_CART,
            payload: product
        });
        if (!product.cart) {
            toast.success(`¡${product.name} ha sido agregado a tu carrito!`)
        }
    };

    const subtractItemFromCartHandler = id => {
        dispatch({
            type: SUBTRACT_CART,
            payload: id
        });
    }

    const removeItemFromCartHandler = id => {
        dispatch({
            type: REMOVE_CART,
            payload: id
        });
    }

    const clearCartHandler = () => dispatch({ type: CLEAR_CART });

    return (
        <cartContext.Provider
            value={{
                items: state.items,
                totalQuantityCart: state.totalQuantityCart,
                addItem: addItemToCartHandler,
                subtractItem: subtractItemFromCartHandler,
                removeItem: removeItemFromCartHandler,
                clearCart: clearCartHandler,
            }}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartState