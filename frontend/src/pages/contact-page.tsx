import React, { FC } from "react";
import { useDispatch } from "react-redux";

// Import Components
import { ContactForm } from "../components/forms/contact-form";
// Import Actions
import { sendContact } from "../store/place";
// Import Types
import { ContactData } from "../types/contact";

const ContactPage: FC = () => {
  const dispatch = useDispatch();

  const handleContact = async (data: ContactData) => {
    await dispatch(sendContact(data));
  };
  return (
    <div className="main-contact-form">
      <div className="box contact-info">
        <h1 className="contact-info-title">Formulario de Contacto</h1>
        <p className="contact-info__content">
          Consultorio de Nutrición Clínica para adultos y familias.
        </p>
        <p className="contact-info__content">
          Se realizan consultas virtuales y presenciales.
        </p>
        <p className="contact-info__content">
          Envíanos tu consulta para más información.
        </p>
      </div>
      <ContactForm onOk={handleContact} />
    </div>
  );
};

export default ContactPage;
