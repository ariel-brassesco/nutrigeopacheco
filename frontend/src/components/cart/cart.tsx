import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import { CartItemsList } from "./cart-items";
import { CartHeader } from "./cart-header";
import { CartMenuIcon, ButtonClose, ButtonCheckout } from "./common-cart";
// import actions creators
import { removeCartItem, updateCartItem, showCart } from "../../store/cart";
// import Getters
import { getItems, getShowCart } from "../../store/cart";
import { useCallback } from "react";
// Import Types
import { CartItem } from "../../types/cart";

export const Cart: FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const show = useSelector(getShowCart);

  const handleShowCart = useCallback(() => {
    dispatch(showCart(!show));
  }, [dispatch, show]);
  const handleRemoveItem = useCallback(
    (item_id: string) => {
      dispatch(removeCartItem(item_id));
    },
    [dispatch]
  );
  const handleUpdateItem = useCallback(
    (item: CartItem) => {
      dispatch(updateCartItem(item));
    },
    [dispatch]
  );

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <CartMenuIcon numItems={items.length} onShow={handleShowCart} />
      <div className={`cart-modal ${show ? "cart-modal-active" : ""}`}>
        <div className={`cart-menu-content ${show ? "cart-active" : ""}`}>
          <ButtonClose onShow={handleShowCart} />
          <CartHeader />
          {items.length < 1 ? (
            <p className="empty-cart">Tu carrito está vacío.</p>
          ) : (
            <>
              <CartItemsList
                items={items}
                updateItem={handleUpdateItem}
                removeItem={handleRemoveItem}
              />
              <div className="cart-footer">
                <p>total (sin envío):</p>
                <p>$ {total}</p>
              </div>
              <ButtonCheckout />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
