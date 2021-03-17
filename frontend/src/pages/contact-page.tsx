import React, { FC } from "react";

// Import Components
import { ContactForm } from "../components/forms/contact-form";

const ContactPage: FC = () => {
  return (
    <div>
      <div className="contact-info">
        <h1 className="contact-info-title">Formulario de Contacto</h1>
        <p className="block">
          Consultorio de Nutrición Clínica para adultos y familias.
        </p>
        <p className="block">Se realizan consultas virtuales y presenciales.</p>
        <p className="block">Envíanos tu consulta para más información.</p>
      </div>
      <ContactForm onOk={console.log} />
    </div>
    // <div className="mainpage">
  );
};

export default ContactPage;
