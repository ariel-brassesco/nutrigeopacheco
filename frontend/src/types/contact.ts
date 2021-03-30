import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const phoneRegex = /^\+\d{12,15}$/;

export interface ContactData {
  name: string;
  email: string;
  tel: string;
  message: string;
}

export const ContactSchema = yup.object().shape<any>({
  name: yup.string().trim().required("Requerido"),
  email: yup.string().email("Email inválido").required("Requerido"),
  tel: yup
    .string()
    .required("Requerido")
    .matches(phoneRegex, "Número inválido")
    .trim()
    .test("is-valid-phone", "Teléfono no válido", (tel) =>
      isValidPhoneNumber(tel ?? "")
    ),
  message: yup.string().trim().required("Requerido"),
});
