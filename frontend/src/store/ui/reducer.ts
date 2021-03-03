import { Reducer } from "redux";
import { AppState } from "../reducers";
import * as types from "./types";

export interface State {
  loading: Record<string, boolean>;
  error: Record<string, boolean>;
}

const initialState = {
  loading: {},
  error: {},
};

export const uiReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.START:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload]: true,
        },
        error: {
          ...state.error,
          [payload]: undefined,
        },
      };

    case types.FINISH:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload]: false,
        },
        error: {
          ...state.error,
          [payload]: undefined,
        },
      };

    case types.ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: false,
        },
        error: {
          ...state.error,
          [payload.name]: payload.message,
        },
      };

    default:
      return state;
  }
};

export const getLoading = (state: AppState) => state.ui.loading;
export const getError = (state: AppState) => state.ui.error;
