import React, { FC, useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";

// import { Modal, ModalProps } from "../modal";
import { TextInput } from "../text-input";

type Props = {
  address?: Address;
  onOk?: () => void;
};

type Values = Partial<Address>;

export const ContactForm: FC<Props> = ({ onOk, address }) => {
  const onSubmit = useCallback(
    async (values: Values, actions: FormikHelpers<Values>) => {
      try {
        toast.success("Dirección guardada");
        onOk?.();
      } catch (error) {
        toast.error("No se pudo guardar la dirección");
      }
      actions.setSubmitting(false);
    },
    [address?.id, onOk]
  );

  return (
    <Formik<Values>
      initialValues={{
        name: address?.name ?? "",
        street: address?.street ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        betweenStreet1: address?.betweenStreet1,
        betweenStreet2: address?.betweenStreet2,
      }}
      validationSchema={address?.id ? AddressCreateSchema : AddressCreateSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form>
          <TextInput
            label="Nombre y Apellido"
            name="name"
            placeholder="Nombre y Apellido"
          />

          <TextInput label="Dirección" name="street" />

          <TextInput label="Ciudad" name="city" />

          <TextInput label="Provincia" name="state" />

          <TextInput label="Entre calle" name="betweenStreet1" />

          <TextInput label="Y calle" name="betweenStreet2" />
          <button
            type="submit"
            className=""
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default ContactForm;
