import React, { Component } from 'react';
import {QuantityWidget} from './Products';
//import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';


export function CartHeader(props){
    return(
        <div className='cart-header'>
            <p className="cart-title">carrito de compras</p>
            <div className='cart-header-fields'>
                <p>producto</p>
                <p>subtotal</p>
            </div>
        </div>
    )
}


export function ButtonClose({showCart}){
    return (
        <div onClick={showCart.bind(null,false)} className='cart-close-icon'>
            <span className="icon is-medium" >
                <i className="fas fa-times"></i>
            </span>
        </div>
    )
}

export function CartMenuIcon(props){
    const {showCart, show, numItems} = props;
    
    return (
        <div onClick={showCart.bind(null,!show)} className='cart-menu-icon'>
            <span className="icon" >
                <i className="fas fa-shopping-basket"></i>
                <span className='icon cart-menu-numitems'>
                    {numItems}
                </span>
            </span>
        </div>
    )
}

function CartItem(props) {
    const { id, title, images, price, stock} = props.data;
    const { item_id, quantity } =props.data;
    const {updateItem, removeItem} = props;

    let quanMinus = ((quantity-1) < 1)?1:quantity-1;
    let quanPlus = ((quantity+1) > stock)?stock:quantity+1;
    const subtotal = quantity*price;
    return (
        <div className='cart-item'>
            <figure className="image is-64x64 cart-item-image">
                <img src={images[0]} alt={title} />
            </figure>
            <div className='cart-item-info'>
                <p className='cart-item-title'>{title}</p>
                <input type='text' name="product" value={id} readOnly={true} hidden/>
                <p>{`$ ${price}`}</p>
                <QuantityWidget name='quantity'
                                quantity={quantity}
                                increment={updateItem.bind(null, item_id, {quantity: quanPlus})}
                                decrement={updateItem.bind(null, item_id, {quantity: quanMinus})}/>
            </div>
            <p className="cart-item-subtotal">{`$ ${subtotal}`}</p>
            <span className="icon has-text-danger cart-remove-item" onClick={removeItem.bind(null, item_id)}>
                <i className="fas fa-trash"></i>
            </span>
        </div>
    )
}

export function CartItemsList(props) {
    const { items } = props;
    const { updateItem, removeItem} = props;

    return (
        <div className='cart-list-items'>
            {
                items.map(item => {
                    return <CartItem key={item.item_id}
                                    data={item}
                                    updateItem={updateItem}
                                    removeItem={removeItem}
                            />
                })
            }
        </div>
    )
}

export function ButtonEmptyCart(props) {
    const {empty} = props;
    return (
        <button className='button is-danger is-medium' onClick={empty}> 
            Vaciar Carrito
        </button>
    )
}

export function ButtonCheckout (){
    return (
        <button type='submit' className='button is-success is-medium cart-btn-checkout'>
            Comprar
            </button>
    )
}

export function CSRFToken(){
    const csrftoken = Cookies.get('csrftoken');
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} readOnly={true}/>
        )

}
