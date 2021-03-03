import { Base } from "./base";
import { Category } from "./category";
import { Promotion } from "./promotion";

export interface Product extends Base {
  title: string;
  description: string;
  stock: number;
  available_stock: number;
  price: number;
  is_active: boolean;
  new_enabled: boolean;
  has_stock: boolean;
  is_new: boolean;
  slug: string;
  category: Category;
  promotions: Promotion[];
  images: string[];
}
