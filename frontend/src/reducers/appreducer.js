import {combineReducers} from 'redux';
import {productsReducer} from './productsreducer';

const appReducer = combineReducers({
    showcase: productsReducer,
})

export default appReducer;