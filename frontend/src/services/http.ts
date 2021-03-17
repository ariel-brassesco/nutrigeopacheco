import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { logout } from "../actions/dashboardActions";

type Data = Record<string, any>;

const mapData = (result: AxiosResponse<any>) => result.data;

const handleError = async (error: Error & { response: AxiosResponse<any> }) => {
  if (error.response.status === 401) {
    // await store.dispatch(logout() as any);
    window.location.reload(true);
  }

  throw error;
};

export class Http {
  public constructor() {
    axios.defaults.baseURL = "";
    // const token = localStorage.getItem("token") ?? "";
    // this.setAuth(token);
  }

  // public setAuth(token: string) {
  //   if (token) {
  //     axios.defaults.headers.common["authorization"] = `JWT ${token}`;
  //   } else {
  //     delete axios.defaults.headers.common["authorization"];
  //   }
  // }

  public get(path: string, options: AxiosRequestConfig = {}) {
    return axios.get(path, options).then(mapData).catch(handleError);
  }

  public post(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.post(path, data, options).then(mapData).catch(handleError);
  }

  public put(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.put(path, data, options).then(mapData).catch(handleError);
  }

  public patch(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.patch(path, data, options).then(mapData).catch(handleError);
  }

  public delete(path: string, options: AxiosRequestConfig = {}) {
    return axios.delete(path, options).then(mapData).catch(handleError);
  }
}

export const http = new Http();

export const apiRoutes = {
  products: "api/products/",
  categories: "api/category/",
  promotions: "api/promotion/",
  place: "api/place/",
};
