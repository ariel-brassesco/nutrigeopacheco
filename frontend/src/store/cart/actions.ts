import { Dispatch } from "redux";

import * as types from "./types";
import { Product, CartItem } from "../../types";

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
