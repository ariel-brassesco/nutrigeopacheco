import {combineReducers} from 'redux';
// Import other reducers
import fetchGetDataReducer from './fetchGetDataReducer';
// Import actions
import {
    FETCH_CATEGORIES_PENDING,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    FILTER_BY_CATEGORY,
    FILTER_BY_PRODUCT
} from '../actions/actionsFilter';


/* Define the reducer for filters
    The fetchGetDataReducer is a function how take
    usual actions for fetch data (PENDING, SUCCESS, ERROR)
    and return a reducer with the actions passed.
    It is a Reducer Generator for fetching data.
*/

const INITIAL_FILTER_STATE = {
    category: null,
    product: null
};

function filterActiveReducer(state = INITIAL_FILTER_STATE, action) {
    switch(action.type) {
        case FILTER_BY_CATEGORY:
            return {...state, category: action.category, product: null}
        case FILTER_BY_PRODUCT:
            return {...state, category: null, product: action.product.toLowerCase()}
        default: 
            return state;
    }
}

// Combine the reduce to fetch data with the reduce to filter
export const filtersReducer = combineReducers({
    categories: fetchGetDataReducer(
        FETCH_CATEGORIES_PENDING,
        FETCH_CATEGORIES_SUCCESS,
        FETCH_CATEGORIES_ERROR
        ),
    active: filterActiveReducer,
    loader: () => {
        return {
            src: location.origin + '/static/images/filters-fruit-loader.gif',
            className: 'main-loader'
        }
    }
});

// Define and export getters for the state
export const getCategories = state => state.filters.categories.data;
export const getCategoriesPending = state => state.filters.categories.pending;
export const getCategoriesError = state => state.filters.categories.error;
export const getActiveFilter = state => state.filters.active;
export const getFilterLoader = state => state.filters.loader;