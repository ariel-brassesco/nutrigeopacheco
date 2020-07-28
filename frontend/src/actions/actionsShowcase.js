// Define and export actions
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const SHOW_PRODUCT_DETAIL = 'SHOW_PRODUCT_DETAIL';

// Define actions creators
function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

function fetchProductsSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}

function showProductDetail(product) {
    return {
        type: SHOW_PRODUCT_DETAIL,
        product
    }
}

// Export actions creators
export {
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
    showProductDetail
};