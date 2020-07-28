import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// import components
import { NavBar } from '../components/Navigation';
// import actions creators
import {filterByCategory, filterByProduct} from '../actions/actionsFilter';
import {showProductDetail} from '../actions/actionsShowcase'
// import getters
import { getUrl} from '../reducers/breadcrumbReducer';
import { getProducts } from '../reducers/productsReducer';
import { getCategories } from '../reducers/filtersReducer';


class Breadcrum extends Component {

    createListToCrum = (root, cat, prod) => {
        let crums;
        crums = [root];
        if (cat) crums = crums.concat((prod === cat || !prod)?[cat]:[cat, prod]);
        return crums;
    }

    processData = () => {
        const {match, products, categories} = this.props;
        const root = location.pathname.split('/')[1]; // Take the first path string 'tienda'
        const {category=null, product=null} = match.params;
        let crums;
        console.log(this.props);

        // Check between /category or /category/product
        crums = this.createListToCrum(root, category, product);

        // Check if is a search and create the crums
        if (category === 'search') {
            //crums = [root, 'search'];
            crums = crums.map((crum, idx, arr) => {
                    let path =(idx === 0)?'/':arr.slice(0, idx+1).join('/');
                    return { title: crum, path: path}
                })
            return crums;
        }

        // Get the id, title or name and slug of products and categories
        const dataProducts = products.map(({id, title, slug}) => {
            return {
                id,
                title,
                slug,
                type: 'product'
            };
        });
        const dataCategories = categories.map(({id, name: title, slug}) => {
            return {
                id,
                title,
                slug,
                type: 'category'
            };
        });
        
        //Create the object with title, slug and path for each crum
        crums = crums.map((crum, idx) => {
            let path =(idx === 0)?'/':`/${crum}`;
            if (idx === 0) return { title: crum, slug: crum, path: path} // Return tienda for first item
            // For each crum generate the corresponding object data 
            return (dataCategories.concat(dataProducts))
                .reduce((acc, cur) => {
                    return (cur.slug === crum) // If the slug match a category or product merge objects
                        ?Object.assign({}, acc, cur,{path})
                        :acc; // If not match, return the acc object
                    },
                    {}); // Initial reduce value {}
                });
        return crums;
    }

    componentDidUpdate(prevProps){
        const {url, history, match} = this.props;
        console.log(match, url, 'DIDUPDATE');
        if (url !== prevProps.url) history.push(url);
    }

    /*componentDidMount() {
        console.log(this.props);
        const {url, match, products, categories} = this.props;
        const {showDetail, filterByProduct, filterByCategory} = this.props;
        console.log(match, url, 'DIDMOUNT');
        console.log(categories);
        if (match.url !== url) {
            const arr = match.url.split('/').slice(1);
            let cat = categories.filter(c => c.slug === arr[0])[0];
            let prod = products.filter(p => p.slug === arr[0])[0] || products.filter(p => p.slug === arr[1])[0];
            filterByCategory(cat.id);
            (prod)?showDetail(prod):showDetail({});
            console.log(new URLSearchParams(match.path));
        }
    }*/

    render(){
        const crums = this.processData();
        
        if(crums.length < 1) return (<div></div>);
        return (<NavBar crums={crums}/>);
    }
}

const mapStateToProps = state => {
    return {
        products: getProducts(state),
        categories: getCategories(state),
        url: getUrl(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterByCategory: (id) => dispatch(filterByCategory(id)),
        filterByProduct: (product) => dispatch(filterByProduct(product)),
        showDetail: (product) => dispatch(showProductDetail(product))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Breadcrum));