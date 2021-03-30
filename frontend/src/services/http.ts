import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Data = Record<string, any>;

const mapData = (result: AxiosResponse<any>) => result.data;

const handleError = async (error: Error & { response: AxiosResponse<any> }) => {
  if (error.response.status === 401) {
    window.location.reload(true);
  }

  throw error;
};

export class Http {
  public constructor() {
    axios.defaults.baseURL = "/";
  }

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
  products: "/nutri/products/",
  categories: "/nutri/category/",
  promotions: "/nutri/promotion/",
  place: "/nutri/place/",
  contact: "/nutri/contact/",
  payment: "/payment/pagar/",
  payment_failure: "/payment/failure/",
  payment_success: "/payment/success/",
};
