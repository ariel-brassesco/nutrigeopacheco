import React, { FC, useCallback } from "react";
import { Form, Formik, Field } from "formik";

// Import Components
import { TextInput } from "../input/text-input";
import { PhoneInput } from "../input/phone-input";
import { CheckoutData, CheckoutSchema } from "../../types";
// Import Types
import { Provinces, PaymentMethod } from "../../types";

type Props = {
  onOk?: (data: CheckoutData) => void;
};

type Values = CheckoutData;

const initialValues = {
  name: "",
  email: "",
  tel: "",
  city: "",
  province: Provinces.SANTA_FE,
  country: "Argentina",
  street: "",
  number: "",
  depto: "",
  comment: "",
  payment_method: "" as PaymentMethod,
};

export const CheckoutForm: FC<Props> = ({ onOk }) => {
  const onSubmit = useCallback(
    async (values: Values, { setSubmitting }) => {
      setSubmitting(true);
      await onOk?.(values);
      setSubmitting(false);
    },
    [onOk]
  );

  return (
    <Formik<Values>
      initialValues={initialValues}
      validationSchema={CheckoutSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, submitForm, setFieldValue }) => (
        <Form className="box mx-3">
          <div>
            <p className="has-text-weight-bold is-size-4 mb-4">
              Datos Personales
            </p>
            <div className="mx-2">
              <TextInput
                className="input valid-input"
                label="Nombre y Apellido"
                labelClass="label label-input-required"
                name="name"
                placeholder="Nombre y Apellido"
                iconClass="control has-icons-left"
                iconLeft={
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                }
              />
            </div>
            <div className="is-flex">
              <div className="is-flex-grow-1 mx-2">
                <TextInput
                  className="input valid-input"
                  label="E-mail"
                  labelClass="label label-input-required"
                  name="email"
                  iconClass="control has-icons-left has-icons-right"
                  iconLeft={
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  }
                  iconRight={
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  }
                />
              </div>
              <div className="is-flex-grow-1 mx-2">
                <PhoneInput
                  className="input valid-input"
                  label="Teléfono"
                  labelClass="label"
                  name="tel"
                  placeholder="34215111111"
                  iconClass="control has-icons-left has-icons-right"
                  iconLeft={
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone"></i>
                    </span>
                  }
                  iconRight={
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  }
                  onChange={(value) => setFieldValue("tel", value ?? "")}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="has-text-weight-bold is-size-4 my-4">
              Datos de Envío
            </p>
            <div className="is-flex">
              <div className="mx-2">
                <TextInput
                  className="input valid-input"
                  label="Ciudad"
                  labelClass="label label-input-required"
                  name="city"
                />
              </div>
              <div className="mx-2">
                <div className="field">
                  <label className="label">Provincia:</label>
                  <div className="select">
                    <div className="control">
                      <Field as="select" name="province">
                        {Object.values(Provinces).map((p) => (
                          <option key={p} value={p}>
                            {p.toUpperCase()}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-2">
                <TextInput
                  className="input valid-input is-capitalized"
                  label="País"
                  labelClass="label label-input-required"
                  name="country"
                  disabled
                />
              </div>
            </div>
            <div className="is-flex">
              <div className="mx-2">
                <TextInput
                  className="input valid-input"
                  label="Calle"
                  labelClass="label label-input-required"
                  name="street"
                />
              </div>
              <div className="mx-2">
                <TextInput
                  className="input valid-input is-capitalized"
                  label="Número"
                  labelClass="label label-input-required"
                  name="number"
                />
              </div>
              <div className="mx-2">
                <TextInput
                  className="input"
                  label="Piso/Depto"
                  labelClass="label"
                  name="depto"
                />
              </div>
            </div>
          </div>
          <TextInput
            className="textarea"
            label="Observaciones"
            labelClass="label"
            name="comment"
            type="textarea"
            maxLength={200}
            iconClass="control"
            iconLeft={<p className="help">Máximo 200 caracteres.</p>}
          />
          <div>
            <p className="has-text-weight-bold is-size-4 my-4">
              Medios de Pago
            </p>
            <div className="control is-flex is-justify-content-space-around is-align-items-center">
              <Field
                id={PaymentMethod.MERCADOPAGO}
                type="radio"
                name="payment_method"
                value={PaymentMethod.MERCADOPAGO}
                hidden
              />
              <label className="radio" htmlFor={PaymentMethod.MERCADOPAGO}>
                <figure className="image is-64x64">
                  <img
                    src="/static/images/logo_mercadopago.png"
                    alt="mercadopago"
                  />
                </figure>
              </label>
              <Field
                id={PaymentMethod.TRANSFERENCIA}
                type="radio"
                name="payment_method"
                value={PaymentMethod.TRANSFERENCIA}
                hidden
              />
              <label className="radio" htmlFor={PaymentMethod.TRANSFERENCIA}>
                <span className="icon">
                  <i className="fas fa-landmark"></i>
                </span>
                Transferencia
              </label>
              <Field
                id={PaymentMethod.EFECTIVO}
                type="radio"
                name="payment_method"
                value={PaymentMethod.EFECTIVO}
                hidden
              />
              <label className="radio" htmlFor={PaymentMethod.EFECTIVO}>
                <span className="icon">
                  <i className="fas fa-dollar-sign"></i>
                </span>{" "}
                Efectivo
              </label>
            </div>
          </div>
          <div className="buttons is-centered">
            <button
              type="submit"
              className={`button is-large is-success ${
                isSubmitting ? "is-loading" : ""
              }`}
              onClick={submitForm}
              disabled={isSubmitting}
            >
              Pagar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CheckoutForm;
