import React, { FC, useCallback } from "react";
import { Form, Formik } from "formik";

// import { Modal, ModalProps } from "../modal";
import { TextInput } from "../input/text-input";
import { PhoneInput } from "../input/phone-input";
import { ContactData, ContactSchema } from "../../types/contact";

type Props = {
  onOk?: (data: ContactData) => void;
};

type Values = ContactData;

export const ContactForm: FC<Props> = ({ onOk }) => {
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
      initialValues={{
        name: "",
        email: "",
        tel: "",
        message: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, submitForm, setFieldValue }) => (
        <Form className="box contact-form">
          <TextInput
            className="input valid-input"
            label="Nombre y Apellido"
            labelClass="label contact-label label-input-required"
            name="name"
            placeholder="Nombre y Apellido"
            iconClass="control has-icons-left"
            iconLeft={
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            }
          />

          <TextInput
            className="input valid-input"
            label="E-mail"
            labelClass="label contact-label label-input-required"
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

          <PhoneInput
            className="input valid-input"
            label="Teléfono"
            labelClass="label contact-label"
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

          <TextInput
            className="textarea contact-message"
            label="Consulta"
            labelClass="label contact-label label-input-required"
            name="message"
            type="textarea"
            maxLength={200}
            iconClass="control"
            iconLeft={<p className="help">Máximo 200 caracteres.</p>}
          />
          <div className="buttons is-centered">
            <button
              type="submit"
              className={`button contact-form__button is-success ${
                isSubmitting ? "is-loading" : ""
              }`}
              onClick={submitForm}
              disabled={isSubmitting}
            >
              enviar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default ContactForm;
