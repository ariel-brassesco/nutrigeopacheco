import { Dispatch } from "redux";

import * as types from "./types";
import { errorLoading, startLoading, stopLoading } from "../ui/actions";
import { apiRoutes, http } from "../../services/http";
import { Product } from "../../types";

export const fetchProducts = () => async (dispatch: Dispatch) => {
  dispatch(startLoading(types.FETCH_PRODUCTS));

  try {
    const result = await http.get(apiRoutes.products);

    dispatch({ type: types.FETCH_PRODUCTS, payload: result });
    dispatch(stopLoading(types.FETCH_PRODUCTS));
  } catch (error) {
    dispatch(errorLoading(types.FETCH_PRODUCTS));
  }
};

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch(startLoading(types.FETCH_CATEGORIES));

  try {
    const result = await http.get(apiRoutes.categories);

    dispatch({ type: types.FETCH_CATEGORIES, payload: result });
    dispatch(stopLoading(types.FETCH_CATEGORIES));
  } catch (error) {
    dispatch(errorLoading(types.FETCH_CATEGORIES));
  }
};

export const fetchPromotions = () => async (dispatch: Dispatch) => {
  dispatch(startLoading(types.FETCH_PROMOTIONS));

  try {
    const result = await http.get(apiRoutes.promotions);

    dispatch({ type: types.FETCH_PROMOTIONS, payload: result });
    dispatch(stopLoading(types.FETCH_PROMOTIONS));
  } catch (error) {
    dispatch(errorLoading(types.FETCH_PROMOTIONS));
  }
};

export const showProductDetail = (product: Product) => (dispatch: Dispatch) =>
  dispatch({
    type: types.SHOW_PRODUCT_DETAIL,
    payload: product,
  });

export const filterByCategory = (id: string) => (dispatch: Dispatch) =>
  dispatch({
    type: types.FILTER_BY_CATEGORY,
    payload: {
      category: id,
      product: null,
    }, // The filter by category is with id
  });

export const filterByProduct = (search: string) => (dispatch: Dispatch) =>
  dispatch({
    type: types.FILTER_BY_PRODUCT,
    payload: {
      category: null,
      product: search,
    }, // The filter by product is by match search
  });
