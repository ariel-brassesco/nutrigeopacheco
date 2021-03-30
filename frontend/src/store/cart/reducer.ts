import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../reducers";
import { CartItem } from "../../types";
import * as types from "./types";

export interface State {
  items: CartItem[];
  show: boolean;
}

const initialState: State = {
  items: [],
  show: false,
};

export const cartReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.ADD_CART_ITEM:
      //If the item is not in cart add it
      let has_item = state.items.some((item) => item.id === payload.id);
      let items;

      if (!has_item) {
        const new_item = { ...payload, item_id: uuidv4() };
        items = state.items.concat(new_item);
      } else {
        //If the item already is in the cart, updated
        items = state.items.map((item) => {
          if (item.id === payload.item.id) {
            item.quantity += payload.item.quantity;
            item.quantity =
              item.quantity > item.stock ? item.stock : item.quantity;
          }

          return item;
        });
      }

      return { ...state, items };

    case types.REMOVE_CART_ITEM:
      items = state.items.filter(({ item_id }) => item_id !== payload.id);
      return { ...state, items };

    case types.UPDATE_CART_ITEM:
      items = state.items.map((item) => {
        if (item.item_id === payload.item_id) return { ...item, ...payload };
        return item;
      });
      return { ...state, items };

    case types.EMPTY_CART:
      return { ...state, items: [] };

    case types.SHOW_CART:
      return { ...state, ...payload };

    default:
      return state;
  }
};

// Define getters from the state
export const getItems = (state: AppState) => state.cart.items;
export const getShowCart = (state: AppState) => state.cart.show;
