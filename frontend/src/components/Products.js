import React, { Component } from 'react';
import {NewProductTag, NoStockTag} from './Common';

export const Product = ({prod, show}) => {
    
    const {images, title, price, is_new, new_enabled, has_stock} = prod;
    const picture = images[0];    
    const newTag = (is_new && new_enabled)?<NewProductTag />:null;
    const noStock = (!has_stock)?<NoStockTag />:null;


    return (
        <div className="card showcase-item" onClick={show.bind(null, prod)}>
            {newTag}
            <div className="card-image">
                <figure className="image is-1by1">
                    <img src={picture} alt={title} />
                </figure>
            </div>
            <div className="card-content product-card-content">
                <p className="product-card-content__title">{title}</p>
                <span className='tag is-white is-medium product-card-content__price'>$ {price}</span>        
                {noStock}
            </div>
        </div>
    )
}

class ImagesShower extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: 0
        }

        this._imageClick = this._imageClick.bind(this);
    }
    
    _imageClick(e) {
        const source = e.target.src.replace(location.origin, ''); //Delete the origin in src string
        let newImage = this.props.images.indexOf(source); // Find the index in array images
        newImage = (newImage < 0)?0:newImage; // If src not match, show the first image in array
        // Set the new image if it's different
        if (newImage !== this.state.image) this.setState({ image: newImage }) 
    }
    
    render() {
        const {images} = this.props;
        let idx = this.state.image;
        let imgToShow = null;
        
        if (images.length > 1){
            imgToShow = images.map((img, key) => {
                return (
                    <figure key={key} className="image is-96x96" onClick={this._imageClick}>
                        <img src={img} />
                    </figure>
                )
            })
        };

        return (
            <div className='product-detail-images'>
                <div className='imageshower-images'>{imgToShow}</div>
                <figure className="imageshower-main-image is-1by1">
                    <img src={images[idx]} />
                </figure>
            </div>
        )
    }
}

export  function QuantityWidget (props) {

    const {name, quantity, increment, decrement} = props;

    return (
        <div className='quantity-widget'>
            <p className='quantity-widget-title'>cantidad</p>
            <div className="buttons has-addons quantity-widget-counter">
                <span className="button is-success is-small is-outlined quantity-widget-btn-left" onClick={decrement}>
                    <span className="icon is-small">
                        <i className="fas fa-minus"></i>
                    </span>
                </span>
                <input className='input is-success is-small quantity-widget-input' type='text' readOnly value={quantity} name={name} />
                <span className="button is-success is-small is-outlined quantity-widget-btn-rigth" onClick={increment}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                </span>
            </div>
        </div>
    );
}

function AddToCartButton(props){
    const {title, data, addToCart} = props;
    
    return (
        <button className='button is-success is-medium btn-add-to-cart' onClick={addToCart.bind(null, data)}>
            {title}
        </button>
        )
}

function NotMatchProducts({message}){
    return (<p className="no-match-products">
        {(message != '')
        ?message
        :"NO HAY PRODUCTOS PARA MOSTRAR"}
        </p>)
}
export class ProductDetail extends Component {
    state = {
        quantity: 1,
        max: this.props.data.stock
    }

    decrementQuantity = () => {
        const {quantity} = this.state;
        if(quantity > 1) this.setState({quantity: quantity-1})
    }

    incrementQuantity = () => {
        const {quantity, max} = this.state;
        if(quantity < max) this.setState({quantity: quantity+1})
    }

    goBackClick = () => {
        this.props.goBack({}); // Passing and empty object not render detail product
    }

    _addToCart = (data) => {
        const {addToCart} = this.props;
        addToCart(data);
        this.goBackClick();
    }

    render(){
        const {title, description, price, images, has_stock} = this.props.data;
        const {quantity} = this.state;
        let noStock;
        
        if (!has_stock) {
            noStock = <NoStockTag />;
        } else {
            noStock = [
                <QuantityWidget key="quantity"
                                quantity={quantity}
                                increment={this.incrementQuantity}
                                decrement={this.decrementQuantity}/>,
                <AddToCartButton key="addtocart" 
                                title='AGREGAR AL CARRITO'
                                data={{...this.props.data, quantity: quantity}}
                                addToCart={this._addToCart}/>
            ]
        }

        return (
            <div className='product-detail'>
                <button className="button is-small is-success product-detail__btn-back" onClick={this.goBackClick}>
                    <i className="fas fa-arrow-alt-circle-left"></i> VOLVER
                </button>
                <ImagesShower images={images}/>
                <div className='product-detail-info'>
                    <h2 className='product-detail-title'>{title}</h2>
                    <p className='product-detail-description'>{description}</p>
                    <p className='product-detail-price'>$ {price}</p>
                    <hr/>
                    {noStock}
                </div>
            </div>
        )
    }
}

export function ProductList(props) {
    const {products, filter: {category, product }, showDetail, categories} = props;
    const productsShow = products
                            .filter(p => (!category)?true:(p.category.id === category)) // Filter by category if it is not null
                            .filter(p => (!product)?true:(p.title.toLowerCase().includes(product))); // Filter by product if it is not null

    if (productsShow.length === 0) {
        let catMessage = categories.filter(c => c.id === category);
        const message = (catMessage.length !== 0)?catMessage[0].message:'';
        return <NotMatchProducts message={message}/>
    }

    return (
        <div className='showcase-list'>
        {productsShow.map(prod => {
            return <Product
                key={prod.id}
                {...{prod, show: showDetail}}
            />
        })}
        </div>
    );
}