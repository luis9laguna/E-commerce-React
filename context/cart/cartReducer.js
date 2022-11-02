import { ADD_CART, SUBTRACT_CART, REMOVE_CART, CLEAR_CART, CART_LOCAL } from "utils/types";


export default (state, action) => {

    let existingCartItemIndex;
    let existingCartItem;
    let updatedItem;
    let updatedItems;
    let updatedTotalQuantity;

    switch (action.type) {


        case ADD_CART:

            //GETTING INDEX AND INFO OF PRODUCT IF IT EXISTS
            existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            existingCartItem = state.items[existingCartItemIndex];

            //IF IT EXISTS, UPDATING...
            if (existingCartItem) {
                updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + action.payload.quantity
                }
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.payload)
            }
            //GETTING TOTAL OF PRODUCTS IN CART
            updatedTotalQuantity = updatedItems.reduce((c, item) => { return c + item.quantity }, 0)

            return {
                items: updatedItems,
                totalQuantityCart: updatedTotalQuantity
            }

        case SUBTRACT_CART:

            //GETTING INDEX AND INFO OF PRODUCT
            existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
            existingCartItem = state.items[existingCartItemIndex];

            //UPDATING TOTAL OF CART
            updatedTotalQuantity = state.totalQuantityCart - 1

            //UPDATING OR DELETING PRODUCT FROM THE CART
            if (existingCartItem.quantity === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload);
            } else {
                updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem
            }

            return {
                items: updatedItems,
                totalQuantityCart: updatedTotalQuantity
            }

        case REMOVE_CART:

            //GETTING INDEX AND INFO OF PRODUCT
            existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
            existingCartItem = state.items[existingCartItemIndex];

            //UPDATING TOTAL OF CART
            updatedTotalQuantity = state.totalQuantityCart - existingCartItem.quantity

            //UPDATING OR DELETING PRODUCT FROM THE CART
            updatedItems = state.items.filter(item => item.id !== action.payload);

            return {
                items: updatedItems,
                totalQuantityCart: updatedTotalQuantity
            }

        case CLEAR_CART:
            return state

        case CART_LOCAL:
            updatedItems = [...action.payload]

            //GETTING TOTAL OF PRODUCTS IN CART
            updatedTotalQuantity = updatedItems.reduce((c, item) => { return c + item.quantity }, 0)

            return {
                items: updatedItems,
                totalQuantityCart: updatedTotalQuantity
            }


        default:
            return state;
    }
}