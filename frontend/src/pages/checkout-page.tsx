import React, { FC } from "react";
import { useSelector } from "react-redux";

// Import Components
import { BannerInfoCheckout } from "../components/common";
import { CheckoutItem } from "../components/cart/checkout-item";
import { CheckoutForm } from "../components/forms/checkout-form";
// // Import Actions
// import {
//   fetchProducts,
//   fetchCategories,
//   fetchPromotions,
// } from "../store/showcase";
// Import Getters
import { getItems } from "../store/cart";

const CheckoutPage: FC = () => {
  const items = useSelector(getItems);

  return (
    <div>
      <div className="is-flex">
        <CheckoutForm />
        <div className="is-flex-grow-1">
          {items.map((i) => (
            <CheckoutItem key={i.item_id} item={i} />
          ))}

          <div id="discount-items"></div>

          <div className="cart-footer">
            {/* <p>Total: </p><p id='total-cart'>$ {{items|total_purchase|floatformat:2}}</p> */}
          </div>
        </div>
      </div>
      <BannerInfoCheckout />
    </div>
  );
};

export default CheckoutPage;
