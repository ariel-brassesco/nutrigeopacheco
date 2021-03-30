import { Product } from "./product";

export interface CartItem extends Product {
  item_id: string;
  quantity: number;
}
