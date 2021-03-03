import { v4 as uuidv4 } from "uuid";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  EMPTY_CART,
  SHOW_CART,
} from "../actions/actionsCart";

const INITIAL_CART_STATE = {
  items: [],
  show: false,
};

export function cartReducer(state = INITIAL_CART_STATE, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      //If the item is not in cart add it
      let has_item = state.items.some((item) => item.id === action.item.id);
      let items;

      if (!has_item) {
        const new_item = { ...action.item, item_id: uuidv4() };
        items = state.items.concat(new_item);
      } else {
        //If the item already is in the cart, updated
        items = state.items.map((item) => {
          if (item.id === action.item.id) {
            item.quantity += action.item.quantity;
            item.quantity =
              item.quantity > item.stock ? item.stock : item.quantity;
          }

          return item;
        });
      }

      return { ...state, items };

    case REMOVE_CART_ITEM:
      items = state.items.filter(({ item_id }) => item_id !== action.id);
      return { ...state, items };

    case UPDATE_CART_ITEM:
      items = state.items.map((item) => {
        if (item.item_id === action.id) return { ...item, ...action.data };
        return item;
      });
      return { ...state, items };

    case EMPTY_CART:
      return { ...state, items: [] };

    case SHOW_CART:
      return { ...state, show: action.show };

    default:
      return state;
  }
}

export const getCartItems = (state) => state.cart.items;
export const getShowCart = (state) => state.cart.show;
