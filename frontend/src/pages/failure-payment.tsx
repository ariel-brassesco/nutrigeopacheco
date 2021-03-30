import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import Actions
import { releaseStock } from "../store/cart";
// Import Routes
import * as route from "../routes";
export const FailurePaymentPage: FC = () => {
  const history = useHistory();

  useEffect(() => {
    releaseStock();
    const timeout = setTimeout(() => {
      history.push(route.STORE);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div>
      <div className="response-checkout">
        <img
          className="response-checkout-image"
          src="/static/images/failure_check_image.png"
          alt="loading..."
        />
        <p className="response-checkout-content">
          Lo sentimos, alguien se te adelanto!!
          <br />
          No tenemos stock disponible de todos o alguno de los productos que
          elegiste.
          <br />
          Consultanos para saber cuando van a estar disponibles.
        </p>
      </div>
    </div>
  );
};
export default FailurePaymentPage;
