import { Reducer } from "redux";
import { AppState } from "../reducers";
import { Place } from "../../types";
import * as types from "./types";

export interface State {
  place: Partial<Place>;
}

const initialState: State = {
  place: {},
};

export const placeReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FETCH_PLACE:
      return { ...state, place: payload };

    default:
      return state;
  }
};

// Define getters from the state
export const getPlace = (state: AppState) => state.place.place;
