import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './actionsShowcase';
import axios from 'axios';

export function fetchProducts(url) {
    return (dispatch) => {
        // Inititate the loading state
        dispatch(fetchProductsPending());
        
        axios.get(url)
        .then(res => {
            const {data: products} = res;
            console.log(res);
            dispatch(fetchProductsSuccess(products));
            return products;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}