import { Base } from "./base";

export interface Category extends Base {
  name: string;
  is_active: boolean;
  message: string;
  orden: number;
  slug: string;
}
