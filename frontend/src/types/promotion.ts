import { Base } from "./base";

export enum PromoTarget {
  PRODUCT = "product",
  CATEGORY = "category",
  SHIPPING = "shipping",
  PAYMENT = "payment",
  ALL = "all",
}

export enum PromoTypes {
  PERCENT = "percent",
  NXM = "nxm",
  FREE = "free",
  CODE = "code",
}

export interface Promotion extends Base {
  target: PromoTarget;
  _type: PromoTypes;
  code: string;
  text: string;
  is_active: boolean;
}
