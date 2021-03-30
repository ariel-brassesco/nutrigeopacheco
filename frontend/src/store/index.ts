import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

function saveState(state: Record<string, any>) {
  try {
    sessionStorage.setItem("storeCache", JSON.stringify(state));
  } catch (e) {
    console.warn(e);
  }
}

function loadState() {
  try {
    const state = sessionStorage.getItem("storeCache");
    if (state == null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(
  reducers,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveState(store.getState()));

export default store;
