import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

// Import Components
import Page from "../components/page";
import Header from "../components/header";
import Footer from "../components/footer";
import HomePage from "./home-page";
import ContactPage from "./contact-page";
import StorePage from "./store-page";
// Import Routes
import * as routes from "../routes";

const CommonPage: FC = () => (
  <Page header={<Header />} footer={<Footer />}>
    <Switch>
      <Route path={routes.STORE} component={StorePage} />
      <Route exact path={routes.CONTACT} component={ContactPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </Page>
);

export default CommonPage;
