import React, { FC, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { pick } from "lodash";

// Import Components
import { BannerInfoCheckout } from "../components/common";
import { CheckoutItem } from "../components/cart/checkout-item";
import { CheckoutForm } from "../components/forms/checkout-form";
// Import Actions
import { fetchPromotions } from "../store/showcase";
import { checkoutCart } from "../store/cart";
// Import Getters
import { getItems } from "../store/cart";
import { getPromotions } from "../store/showcase";
// Import Utils
import { formatCurrency } from "../utils/format";
import { CartItem } from "../types";
// Import Routes
import * as routes from "../routes";

const CheckoutPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const promotions = useSelector(getPromotions);
  const items = useSelector(getItems);
  const total = items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const [discount, setDiscount] = useState<{
    id: string | number;
    price: number;
    text: string;
  } | null>(null);

  const applyPaymentDiscount = useCallback(
    (payment: string) => {
      if (!!payment && !!promotions) {
        promotions.forEach((p) => {
          let [amount, method] = p.code.split("-");
          if (method === payment) {
            switch (p._type) {
              case "percent":
                const price = (parseInt(amount) / 100) * total;
                if (p.id !== discount?.id)
                  setDiscount({
                    id: p.id,
                    price: price,
                    text: `${parseInt(amount)}% OFF`,
                  });
                break;
              default:
                break;
            }
          } else {
            setDiscount(null);
          }
        });
      }
    },
    [promotions, total, discount]
  );

  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  const handlePaymentCart = useCallback(
    async (values: any) => {
      const response = await checkoutCart({
        data: { ...values, apply_discount: discount?.id },
        items: items.reduce(
          (acc: { id: string | number; quantity: number }[], i: CartItem) => [
            ...acc,
            pick(i, ["id", "quantity"]),
          ],
          []
        ),
      })(dispatch);

      if (!!response) {
        if (!!response.url) {
          window.location.replace(response.url);
        } else {
          history.push(
            response.payment
              ? `${routes.SUCCESS_PAYMENT}?payment=${response.method}`
              : routes.FAILURE_PAYMENT
          );
        }
      }
    },
    [dispatch, items, history, discount]
  );

  return (
    <div>
      <div className="promotions-info">
        {promotions.map((p) => (
          <p key={p.id} className="promo-gen">
            {p.text}
          </p>
        ))}
      </div>
      <div className="is-flex is-flex-wrap-wrap">
        <CheckoutForm
          applyPaymentDiscount={applyPaymentDiscount}
          onOk={handlePaymentCart}
        />
        <div className="box mx-3 mb-5 is-flex-grow-1">
          {items.map((i) => (
            <CheckoutItem key={i.item_id} item={i} />
          ))}

          <div id="discount-items">
            {!!discount && (
              <div className="discount-item">
                <p>{discount.text}</p>
                <p>{`-${formatCurrency(discount.price, 2)}`}</p>
              </div>
            )}
          </div>

          <div className="cart-footer">
            <p>Total: </p>
            <p id="total-cart">
              {formatCurrency(total - (discount ? discount.price : 0), 2)}
            </p>
          </div>
        </div>
      </div>
      <BannerInfoCheckout />
    </div>
  );
};

export default CheckoutPage;
