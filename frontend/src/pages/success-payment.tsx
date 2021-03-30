import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Import Actions
import { emptyCart, showCart } from "../store/cart";
// Import Types
import { PaymentMethod } from "../types/checkout";
// Import Routes
import * as route from "../routes";

export const SuccessPaymentPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const payment = query.get("payment");

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push(route.STORE);
    }, 2000);
    dispatch(emptyCart());
    dispatch(showCart(false));
    return () => clearTimeout(timeout);
  }, [dispatch, history]);

  return (
    <div className="response-checkout">
      <img
        className="response-checkout-image"
        src="/static/images/success_check_image.png"
        alt="Loading ..."
      />
      {payment === PaymentMethod.EFECTIVO ? (
        <p className="response-checkout-content">
          Tu orden fue procesada con exito!
        </p>
      ) : payment === PaymentMethod.TRANSFERENCIA ? (
        <>
          <p className="response-checkout-content">
            Tu orden fue procesada con exito!
          </p>
          <p className="response-checkout-content">
            Te enviamos los datos por email. No te olvides de revisar tu casilla
            de SPAM.
          </p>
        </>
      ) : (
        <p className="response-checkout-content">
          El pago se ha realizado con exito!
        </p>
      )}
      <p className="response-checkout-content">Muchas gracias por tu compra!</p>
    </div>
  );
};
export default SuccessPaymentPage;
