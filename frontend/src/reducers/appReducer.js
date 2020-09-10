import {combineReducers} from 'redux';
import {productsReducer} from './productsReducer';
import {filtersReducer} from './filtersReducer';
import {breadcrumbReducer} from './breadcrumbReducer';
import {cartReducer} from './cartReducer';
import {promotionsReducer} from './promotionsReducer';

const appReducer = combineReducers({
    showcase: productsReducer,
    filters: filtersReducer,
    breadcrumb: breadcrumbReducer,
    cart: cartReducer,
    promotions: promotionsReducer
})

export default appReducer;