import { Base } from "./base";

export interface Place extends Base {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  logo: string;
  instagram: string;
  whatsapp: string;
}
