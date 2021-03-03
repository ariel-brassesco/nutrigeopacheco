import * as types from "./types";

export const startLoading = (name: string) => ({
  type: types.START,
  payload: name,
});

export const stopLoading = (name: string) => ({
  type: types.FINISH,
  payload: name,
});

export const errorLoading = (name: string, message: string = "Error") => ({
  type: types.ERROR,
  payload: { name, message },
});
