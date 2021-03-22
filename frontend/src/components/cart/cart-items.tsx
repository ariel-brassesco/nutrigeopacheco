import React, { FC } from "react";

//Import Components
import { PromoTag } from "../products/common-products";
import { QuantityWidget } from "./common-cart";
// Import Types
import { CartItem as CartType } from "../../types";

type PropsItem = {
  item: CartType;
  onUpdate: (data: CartType) => void;
  onRemove: () => void;
};

const CartItem: FC<PropsItem> = ({ item, onUpdate, onRemove }) => {
  const { id, title, images, price, stock } = item;
  const { quantity, promotions } = item;

  let quanMinus = quantity - 1 < 1 ? 1 : quantity - 1;
  let quanPlus = quantity + 1 > stock ? stock : quantity + 1;
  const subtotal = quantity * price;
  const promo =
    promotions.length > 0 ? (
      <PromoTag data={promotions[0]} className="tag is-danger" />
    ) : null;

  const handleQuantity = (quantity) => () =>
    onUpdate({
      ...item,
      quantity,
    });
  return (
    <div className="cart-item">
      <figure className="image is-64x64 cart-item-image">
        <img src={images[0]} alt={title} />
      </figure>
      <div className="cart-item-info">
        <p className="cart-item-title">{title}</p>
        <input type="text" name="product" value={id} readOnly={true} hidden />
        <p className="mb-1">
          {`$ ${price}`} {promo}
        </p>
        <QuantityWidget
          name="quantity"
          quantity={quantity}
          onIncrement={handleQuantity(quanPlus)}
          onDecrement={handleQuantity(quanMinus)}
        />
      </div>
      <p className="cart-item-subtotal">{`$ ${subtotal}`}</p>
      <span
        className="icon has-text-danger cart-remove-item"
        onClick={onRemove}
      >
        <i className="fas fa-trash"></i>
      </span>
    </div>
  );
};

type PropsListItems = {
  items: CartType[];
  updateItem: (data: CartType) => void;
  removeItem: (item_id: string) => void;
};

export const CartItemsList: FC<PropsListItems> = ({
  items,
  updateItem,
  removeItem,
}) => {
  const handleRemoveItem = (item_id: string) => () => removeItem(item_id);

  return (
    <div className="cart-list-items">
      {items.map((item) => {
        return (
          <CartItem
            key={item.item_id}
            item={item}
            onUpdate={updateItem}
            onRemove={handleRemoveItem(item.item_id)}
          />
        );
      })}
    </div>
  );
};
