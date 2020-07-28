import React, {Component} from 'react';
import {connect} from 'react-redux';
//Import Components
import {ProductList, ProductDetail} from '../components/Products';
import {Loader} from '../components/Loaders';
// Import actions creators
import fetchGetData from '../actions/fetchData';
import {showProductDetail} from '../actions/actionsShowcase';
import {addCartItem} from '../actions/actionsCart';
import {updateURL} from '../actions/actionsBreadcrumb';
// Import actions
import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR
} from '../actions/actionsShowcase';
import {UPDATE_TYPE_PRODUCT_DETAIL} from '../actions/actionsBreadcrumb';
// Import getters
import {
    getProducts,
    getProductsError,
    getProductsPending,
    getProductDetail,
    getProductsLoader
} from '../reducers/productsReducer';
import {getActiveFilter, getCategories} from '../reducers/filtersReducer';


class ProductsView extends Component {

    componentDidMount(){
        const {pending, fetchProducts} = this.props;
        if (!pending) fetchProducts();
    }

    render() {
        const {products, error, pending, loader} = this.props;
        const {detail, showDetail, addCartItem} = this.props;
        const {filter, categories} = this.props;
        
        if (error) return <p>Could not load the products.</p>;
        
        return (pending)?(<Loader src={loader.src} className={loader.className} />):(
            <div className="showcase">
                {
                    (Object.keys(detail).length !== 0) // Check the object is not empty
                    ?<ProductDetail data={detail} goBack={showDetail} addToCart={addCartItem}/>
                    :<ProductList {...{products, filter, categories, showDetail}} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: getProducts(state),
        pending: getProductsPending(state),
        error: getProductsError(state),
        detail: getProductDetail(state),
        filter: getActiveFilter(state),
        loader: getProductsLoader(state),
        categories: getCategories(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProducts: () => fetchGetData(
            ownProps.url,
            FETCH_PRODUCTS_PENDING,
            FETCH_PRODUCTS_SUCCESS,
            FETCH_PRODUCTS_ERROR
        )(dispatch),
        showDetail: (product) => ((dispatch) => {
            dispatch(showProductDetail(product))
            dispatch(updateURL(UPDATE_TYPE_PRODUCT_DETAIL, product))
        })(dispatch),
        addCartItem: (item) => dispatch(addCartItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
