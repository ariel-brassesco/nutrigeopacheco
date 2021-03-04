import React, { FC } from "react";

import Page from "../components/page";
import Header from "../components/header";
import Footer from "../components/footer";

const HomePage: FC = () => {
  return (
    <Page header={<Header />} footer={<Footer />}>
      Inicio
    </Page>
    // <div className="mainpage">
  );
};

export default HomePage;
