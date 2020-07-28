import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {NavLink} from 'react-router-dom';
// Import Components
import {NavigationMenu, Category, SearchProduct} from '../components/Navigation';
import {Loader} from '../components/Loaders';
// Import actions creators
import fetchGetData from '../actions/fetchData';
import {
    filterByCategory,
    filterByProduct
} from '../actions/actionsFilter';
import {updateURL} from '../actions/actionsBreadcrumb';
// Import actions
import {
    FETCH_CATEGORIES_PENDING,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
} from '../actions/actionsFilter';
import {
    UPDATE_TYPE_CATEGORY,
    UPDATE_TYPE_PRODUCT
} from '../actions/actionsBreadcrumb';
// Import getters
import {
    getCategories,
    getCategoriesError,
    getCategoriesPending,
    getActiveFilter,
    getFilterLoader
} from '../reducers/filtersReducer';


class NavFilter extends Component {

    componentDidMount(){
        const {pending, fetchCategories} = this.props;
        
        // If pending is false, fetch the data form server
        if (!pending) fetchCategories();
    }

    render() {
        const {categories, error, pending, loader} = this.props;
        const {active, filterByCategory, filterByProduct} = this.props;
        
        if (error) return <p>Could not load the categories.</p>
        
        return (pending)?(<Loader src={loader.src} className={loader.className} />): (
            <aside className="menu filters">
                <SearchProduct filterBy={filterByProduct}/>
                <NavigationMenu nameNav="categorías" nameActive={true}>
                    {categories.map(cat => {
                        let activated = (cat.id === active.category)?'is-active category-item-active':'';
                        return (
                                <Category
                                    key={cat.id}
                                    {...cat}
                                    filterBy={filterByCategory}
                                    activated = {activated}
                                />
                        )})
                    }
                </NavigationMenu>
            </aside>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: getCategories(state),
        pending: getCategoriesPending(state),
        error: getCategoriesError(state),
        active: getActiveFilter(state),
        loader: getFilterLoader(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCategories: () => fetchGetData(
            ownProps.url,
            FETCH_CATEGORIES_PENDING,
            FETCH_CATEGORIES_SUCCESS,
            FETCH_CATEGORIES_ERROR
            )(dispatch),
        filterByCategory: (id, slug) => ((dispatch) => {
            dispatch(filterByCategory(id));
            dispatch(updateURL(UPDATE_TYPE_CATEGORY, slug))
        })(dispatch),
        filterByProduct: (product) => ((dispatch) => {
            dispatch(filterByProduct(product));
            dispatch(updateURL(UPDATE_TYPE_PRODUCT, product));
        })(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavFilter);
