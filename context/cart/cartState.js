import { useEffect, useReducer } from "react";
import Cookies from 'js-cookie'
import cartContext from "./cartContext";
import cartReducer from "./cartReducer";
import Swal from 'sweetalert2'

import { ADD_CART, SUBTRACT_CART, REMOVE_CART, CLEAR_CART, CART_LOCAL } from "types";

const initialState = {
    items: [],
    totalQuantityCart: 0
}

const CartState = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)

    //GET COOKIE CART
    useEffect(() => { getCart() }, []);

    //SET COOKIE CART
    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state.items))
    }, [state.items]);

    const getCart = () => {
        try {
            const cookiesProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : []
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
            Swal.fire({
                title: product.name,
                text: `Han sido añadidos '${product.quantity}'`,
                imageUrl: product.image,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: product.name,
                timer: 2000,
                timerProgressBar: true
            })
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

    const clearCartHandler = () => {
        dispatch({ type: CLEAR_CART })
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
            }}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartState