import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Product} from '../components/ProductsView';
import {fetchProducts} from '../actions/fetchProducts'


class ProductsView extends Component {
    static url = location.origin + '/api/products';

    componentDidMount(){
        const {pending, fetchProducts} = this.props;
        console.log(`pendingMounting:${pending}`);
        console.log(ProductsView.url);
        if (!pending) {
            fetchProducts(ProductsView.url);
        }
    }

    render() {
        const {products, error, pending} = this.props;

        if(pending) return (<p>Loading...</p>)
        
        return (
            <div>
                {products.map((prod, idx) => {
                    return <Product
                        key={idx}
                        picture={prod.images[0]}
                        title={prod.title}
                        price={prod.price}
                    />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.showcase.products,
        pending: state.showcase.pending,
        error: state.showcase.error,
    }
}

const mapDispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
