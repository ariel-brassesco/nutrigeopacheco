// Define and export actions
export const FETCH_CATEGORIES_PENDING = 'FETCH_CATEGORIES_PENDING';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const FILTER_BY_PRODUCT = 'FILTER_BY_PRODUCT';

// Define actions creators
function fetchCategoriesPending() {
    return {
        type: FETCH_CATEGORIES_PENDING
    }
}

function fetchCategoriesSuccess(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories: categories
    }
}

function fetchCategoriesError(error) {
    return {
        type: FETCH_CATEGORIES_ERROR,
        error: error
    }
}

function filterByCategory(id) {
    return {
        type: FILTER_BY_CATEGORY,
        category: id // The filter by category is with id
    }
}

function filterByProduct(search) {
    return {
        type: FILTER_BY_PRODUCT,
        product: search // The filter by product is by match search
    }
}

// export actions creators
export {
    fetchCategoriesPending,
    fetchCategoriesSuccess,
    fetchCategoriesError,
    filterByCategory,
    filterByProduct,
};