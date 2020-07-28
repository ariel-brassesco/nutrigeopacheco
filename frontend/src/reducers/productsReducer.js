import fetchGetDataReducer from './fetchGetDataReducer';
import {combineReducers} from 'redux';
import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    SHOW_PRODUCT_DETAIL
} from '../actions/actionsShowcase';
import {
    FILTER_BY_CATEGORY,
    FILTER_BY_PRODUCT
} from '../actions/actionsFilter';
/* Define the reducer for products
    The fetchGetDataReducer is a function how take
    usual actions for fetch data (PENDING, SUCCESS, ERROR)
    and return a reducer with the actions passed.
    It is a Reducer Generator for fetching data.
*/
const INITIAL_DETAIL_STATE = {}

function showProductDetailReducer(state = INITIAL_DETAIL_STATE, action) {
    switch(action.type) {
        case SHOW_PRODUCT_DETAIL:
            return action.product;
        case FILTER_BY_PRODUCT:
        case FILTER_BY_CATEGORY:
            return {};
        default:
            return state;
    }
}

export const productsReducer = combineReducers({
    products: fetchGetDataReducer(
        FETCH_PRODUCTS_PENDING,
        FETCH_PRODUCTS_SUCCESS,
        FETCH_PRODUCTS_ERROR),
    detail: showProductDetailReducer,
    loader: () => {
        return {
            src: location.origin + '/static/images/showcase-fruit-loader.gif',
            className: 'main-loader'
        }
    }
})


// Define getters from the state
export const getProducts = state => state.showcase.products.data;
export const getProductsPending = state => state.showcase.products.pending;
export const getProductsError = state => state.showcase.products.error;
export const getProductDetail = state => state.showcase.detail;
export const getProductsLoader = state => state.showcase.loader;