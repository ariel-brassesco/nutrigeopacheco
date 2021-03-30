import * as yup from "yup";

export enum Provinces {
  BUENOS_AIRES = "buenos aires",
  CAPITAL_FEDERAL = "capital federal",
  CATAMARCA = "catamarca",
  CHACO = "chaco",
  CHUBUT = "chubut",
  CORDOBA = "córdoba",
  CORRIENTES = "corrientes",
  ENTRE_RIOS = "entre ríos",
  FORMOSA = "formosa",
  JUJUY = "jujuy",
  LA_PAMPA = "la pampa",
  LA_RIOJA = "la rioja",
  MENDOZA = "mendoza",
  NEUQUEN = "neuquén",
  RIO_NEGRO = "río negro",
  SALTA = "salta",
  SAN_JUAN = "san juan",
  SAN_LUIS = "san luis",
  SANTA_CRUZ = "santa cruz",
  SANTA_FE = "santa fe",
  SANTIAGO_DEL_ESTERO = "santiago del estero",
  TIERRA_DEL_FUEGO = "tierra del fuego",
  TUCUMAN = "tucumán",
}

export enum PaymentMethod {
  MERCADOPAGO = "mercadopago",
  TRANSFERENCIA = "transferencia",
  EFECTIVO = "efectivo",
}
export interface CheckoutData {
  name: string;
  email: string;
  tel: string;
  city: string;
  province: Provinces;
  country: string;
  street: string;
  number: string;
  depto: string;
  comment: string;
  payment_method: PaymentMethod;
}

export const CheckoutSchema = yup.object().shape<any>({
  name: yup.string().trim().required("Requerido"),
  email: yup.string().email("Email inválido").required("Requerido"),
  tel: yup.string(),
  city: yup.string().trim().required("Requerido"),
  province: yup.string().oneOf(Object.values(Provinces)).required("Requerido"),
  country: yup.string(),
  street: yup.string().trim().required("Requerido"),
  number: yup.string().trim().required("Requerido"),
  depto: yup.string().trim(),
  comment: yup.string().trim(),
  payment_method: yup.string().oneOf(Object.values(PaymentMethod)),
});
