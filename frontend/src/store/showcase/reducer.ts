import { Reducer } from "redux";
import { AppState } from "../reducers";
import { Product, Promotion, Category, Filter } from "../../types";
import * as types from "./types";

export interface State {
  products: Product[];
  product: Partial<Product>;
  promotions: Promotion[];
  categories: Category[];
  filter: Filter;
}

const initialState: State = {
  products: [],
  product: {},
  promotions: [],
  categories: [],
  filter: { category: null, product: null },
};

export const showcaseReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case types.FETCH_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case types.SHOW_PRODUCT_DETAIL:
    case types.CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: payload,
      };
    case types.FILTER_BY_PRODUCT:
    case types.FILTER_BY_CATEGORY:
      return { ...state, product: {}, filter: payload };
    case types.FETCH_PROMOTIONS:
      return { ...state, promotions: payload };
    default:
      return state;
  }
};

// Define getters from the state
export const getProducts = (state: AppState) => state.showcase.products;
export const getProduct = (state: AppState) => state.showcase.product;
export const getPromotions = (state: AppState) => state.showcase.promotions;
export const getCategories = (state: AppState) => state.showcase.categories;
export const getFilter = (state: AppState) => state.showcase.filter;
