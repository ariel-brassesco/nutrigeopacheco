import { combineReducers } from "redux";
import { uiReducer, State as UiState } from "./ui";
import { showcaseReducer, State as ShowcaseState } from "./showcase";
import { cartReducer, State as CartState } from "./cart";
import { placeReducer, State as PlaceState } from "./place";

export interface AppState {
  ui: UiState;
  showcase: ShowcaseState;
  cart: CartState;
  place: PlaceState;
}

export const reducers = combineReducers<AppState>({
  ui: uiReducer,
  showcase: showcaseReducer,
  cart: cartReducer,
  place: placeReducer,
});
