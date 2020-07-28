import React, { Component } from 'react';
import {connect} from 'react-redux';
// import components
import {
    CartMenuIcon,
    CartItemsList,
    CartHeader,
    ButtonClose,
    ButtonEmptyCart,
    ButtonCheckout,
    CSRFToken
} from '../components/CartItem';
// import actions creators
import { 
    removeCartItem,
    updateCartItem,
    emptyCart,
    showCart
} from '../actions/actionsCart'
// import getters
import {
    getCartItems,
    getShowCart
} from '../reducers/cartReducer';


class Cart extends Component {
    
    render() {
        const { show, items } = this.props;
        const { updateItem, removeItem, emptyCart, showCart} = this.props;

        const total = items.reduce((acc, item) => acc + item.price*item.quantity, 0);
        const numItems = items.length;

        return (
            <div className='cart'>
                <CartMenuIcon {...{show, showCart, numItems}}/>
                <div className={`cart-modal ${show?'cart-modal-active':''}`}>
                    <div className={`cart-menu-content ${show?'cart-active':''}`}>
                    <ButtonClose showCart={showCart} />
                    <CartHeader />
                    {
                        (items.length < 1)
                        ?(<p className='empty-cart'>Tu carrito está vacío.</p>)
                        :(<form action={`${location.origin}/payment/`} method='POST'>
                            <CSRFToken />
                            <CartItemsList items={items}
                                        show={show}
                                        updateItem={updateItem}
                                        removeItem={removeItem}
                                        />
                            <div className='cart-footer'>
                                <p>total (sin envío):</p><p>$ {total}</p>
                            </div>
                            {/*<ButtonEmptyCart empty={emptyCart}/>*/}
                            <ButtonCheckout />
                        </form>)
                    }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        show: getShowCart(state),
        items: getCartItems(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItem: (id, data) => dispatch(updateCartItem(id, data)),
        removeItem: (id) => dispatch(removeCartItem(id)),
        showCart: (show) => dispatch(showCart(show)),
        emptyCart: () => dispatch(emptyCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
