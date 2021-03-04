import { Dispatch } from "redux";

import * as types from "./types";
import { errorLoading, startLoading, stopLoading } from "../ui/actions";
import { apiRoutes, http } from "../../services/http";

export const fetchPlace = () => async (dispatch: Dispatch) => {
  dispatch(startLoading(types.FETCH_PLACE));

  try {
    const result = await http.get(apiRoutes.place);

    dispatch({ type: types.FETCH_PLACE, payload: result });
    dispatch(stopLoading(types.FETCH_PLACE));
  } catch (error) {
    dispatch(errorLoading(types.FETCH_PLACE));
  }
};
