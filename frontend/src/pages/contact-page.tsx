import React, { FC } from "react";

import Page from "../components/page";
import Header from "../components/header";
import Footer from "../components/footer";

const ContactPage: FC = () => {
  return (
    <Page header={<Header />} footer={<Footer />}>
      Contacto
    </Page>
    // <div className="mainpage">
  );
};

export default ContactPage;
