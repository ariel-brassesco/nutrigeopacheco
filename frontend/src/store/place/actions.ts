import { Dispatch } from "redux";
import { toast } from "react-toastify";

import * as types from "./types";
import { ContactData } from "../../types/contact";
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

export const sendContact = (data: ContactData) => async (
  dispatch: Dispatch
) => {
  dispatch(startLoading(types.SEND_CONTACT));

  try {
    const result = await http.post(apiRoutes.contact, data);

    dispatch({ type: types.SEND_CONTACT, payload: result });
    dispatch(stopLoading(types.SEND_CONTACT));
    toast.success("Tu consulta fue enviada");
  } catch (error) {
    dispatch(errorLoading(types.SEND_CONTACT));
    toast.error("Upss!! Inténtalo de nuevo.");
  }
};
