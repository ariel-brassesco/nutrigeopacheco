import React, { FC } from "react";

export const CartHeader: FC = () => (
  <div className="cart-header">
    <p className="cart-title">carrito de compras</p>
    <div className="cart-header-fields">
      <p>producto</p>
      <p>subtotal</p>
    </div>
  </div>
);
