import React, { FC } from "react";
import { Link } from "react-router-dom";
// Import Routes
import * as routes from "../../routes";

type PropsAddCart = {
  title: string;
  onOk: () => void;
};
export const AddToCartButton: FC<PropsAddCart> = ({ title, onOk }) => {
  return (
    <button
      className="button is-success is-medium btn-add-to-cart"
      onClick={onOk}
    >
      {title}
    </button>
  );
};

type PropsQuantityWidget = {
  name: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const QuantityWidget: FC<PropsQuantityWidget> = ({
  name,
  quantity,
  onIncrement,
  onDecrement,
}) => (
  <div className="quantity-widget">
    <p className="quantity-widget-title">cantidad</p>
    <div className="buttons has-addons quantity-widget-counter">
      <span
        className="button is-success is-small is-outlined quantity-widget-btn-left"
        onClick={onDecrement}
      >
        <span className="icon is-small">
          <i className="fas fa-minus"></i>
        </span>
      </span>
      <input
        className="input is-success is-small quantity-widget-input"
        type="text"
        readOnly
        value={quantity}
        name={name}
      />
      <span
        className="button is-success is-small is-outlined quantity-widget-btn-rigth"
        onClick={onIncrement}
      >
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
      </span>
    </div>
  </div>
);

type PropsCartIcon = {
  numItems: number;
  onShow: () => void;
};

export const CartMenuIcon: FC<PropsCartIcon> = ({ numItems, onShow }) => (
  <div onClick={onShow} className="cart-menu-icon">
    <span className="icon">
      <i className="fas fa-shopping-basket"></i>
      <span className="icon cart-menu-numitems">{numItems}</span>
    </span>
  </div>
);

export const ButtonClose: FC<{ onShow: () => void }> = ({ onShow }) => (
  <div onClick={onShow} className="cart-close-icon">
    <span className="icon is-medium">
      <i className="fas fa-times"></i>
    </span>
  </div>
);

export const ButtonEmptyCart: FC<{ empty: () => void }> = ({ empty }) => (
  <button className="button is-danger is-medium" onClick={empty}>
    Vaciar Carrito
  </button>
);

export const ButtonCheckout: FC = () => (
  <Link
    to={routes.CHECKOUT}
    className="button is-success is-medium cart-btn-checkout"
  >
    Comprar
  </Link>
);
