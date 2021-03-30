import React, { FC, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Import Actions
import { emptyCart, showCart, sucessMercadoPago } from "../store/cart";
// Import Routes
import * as route from "../routes";

export const ProcessingPaymentPage: FC = () => {
  const dispatch = useDispatch();
  const params: { cart_id?: string } & {} = useParams();
  const history = useHistory();
  const query = history.location.search;

  const handleSuccess = useCallback(
    async (cart_id: string, query: string) => {
      const res = await sucessMercadoPago(cart_id, query);
      if (res.payment) {
        history.push(`${route.SUCCESS_PAYMENT}?payment=${res.method}`);
      } else {
        history.push(route.FAILURE_PAYMENT);
      }
    },
    [history]
  );

  useEffect(() => {
    dispatch(emptyCart());
    dispatch(showCart(false));
    !!params.cart_id && handleSuccess(params.cart_id, query);
  }, [dispatch, query, params, handleSuccess]);

  return (
    <div className="loader-checkout">
      <img
        className="response-checkout-image"
        src="/static/images/fruit-gif-loader.gif"
        alt="Loading ..."
      />
      <p className="loader-checkout-content">Estamos procesando tu compra...</p>
    </div>
  );
};
export default ProcessingPaymentPage;
