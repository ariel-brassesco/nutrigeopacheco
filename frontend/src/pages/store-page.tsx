import React, { FC } from "react";

import Page from "../components/page";
import Header from "../components/header";
import Footer from "../components/footer";

const StorePage: FC = () => {
  return (
    <Page header={<Header />} footer={<Footer />}>
      Tienda
    </Page>
    // <div className="mainpage">
  );
};

export default StorePage;
