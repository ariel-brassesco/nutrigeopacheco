export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const EMPTY_CART = 'EMPTY_CART';
export const SHOW_CART = 'SHOW_CART';

function addCartItem(item){
    return {
        type: ADD_CART_ITEM,
        item
    }
}

function removeCartItem(item_id) {
    return {
        type: REMOVE_CART_ITEM,
        id: item_id
    }
}

function updateCartItem(item_id, data){
    return {
        type: UPDATE_CART_ITEM,
        id: item_id,
        data
    }
}

function emptyCart(){
    return {
        type: EMPTY_CART
    }
}

function showCart(show){
    return {
        type: SHOW_CART,
        show
    }
}

export {
    addCartItem,
    removeCartItem,
    updateCartItem,
    emptyCart,
    showCart,
};