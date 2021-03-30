import { Dispatch } from "redux";
import { toast } from "react-toastify";

import * as types from "./types";
import { Product, CartItem, PaymentMethod } from "../../types";
import { apiRoutes, http } from "../../services/http";
import { errorLoading, startLoading, stopLoading } from "../ui/actions";

export const addCartItem = (item: Product) => (dispatch: Dispatch) =>
  dispatch({
    type: types.ADD_CART_ITEM,
    payload: item,
  });

export const removeCartItem = (item_id: string) => (dispatch: Dispatch) =>
  dispatch({
    type: types.REMOVE_CART_ITEM,
    payload: { id: item_id },
  });

export const updateCartItem = (item: CartItem) => (dispatch: Dispatch) =>
  dispatch({
    type: types.UPDATE_CART_ITEM,
    payload: item,
  });

export const emptyCart = () => (dispatch: Dispatch) =>
  dispatch({
    type: types.EMPTY_CART,
  });

export const showCart = (show: boolean) => (dispatch: Dispatch) =>
  dispatch({
    type: types.SHOW_CART,
    payload: { show },
  });

export const checkoutCart = (data) => async (dispatch: Dispatch) => {
  dispatch(startLoading(types.CHECKOUT_CART));
  try {
    const response = await http.post(apiRoutes.payment, data);
    dispatch(stopLoading(types.CHECKOUT_CART));
    return response;
  } catch (err) {
    toast.error(err.response.data.text);
    dispatch(errorLoading(types.CHECKOUT_CART));
  }
};

export const releaseStock = async () => {
  try {
    const response = await http.get(apiRoutes.payment_failure);
    return response.ok;
  } catch {
    return false;
  }
};

export const sucessMercadoPago = async (cart_id: string, query: string) => {
  try {
    const response = await http.get(
      `${apiRoutes.payment_success}${cart_id}/${query}`
    );
    return response;
  } catch {
    return { payment: false, method: PaymentMethod.MERCADOPAGO };
  }
};
