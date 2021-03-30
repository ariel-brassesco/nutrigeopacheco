import React, { FC } from "react";

// Import Types
import { CartItem } from "../../types";
// Import Utils
import { formatCurrency } from "../../utils/format";

type Props = {
  item: CartItem;
};
export const CheckoutItem: FC<Props> = ({ item }) => (
  <div className="is-flex my-4">
    {item.images?.[0] && (
      <figure className="image is-64x64 mx-2">
        <img src={item.images[0]} alt={item.title} />
      </figure>
    )}
    <div>
      <p className="is-capitalized has-text-weight-bold">{item.title}</p>
      <p>
        {item.quantity}x {formatCurrency(item.price)}
      </p>
    </div>
  </div>
);
