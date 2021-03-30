import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Import Components
import Page from "../components/page";
import Header from "../components/header";
import Footer from "../components/footer";
import HomePage from "./home-page";
import ContactPage from "./contact-page";
import StorePage from "./store-page";
import ServicesPage from "./services-page";
import RecipesPage from "./recipes-page";
import CheckoutPage from "./checkout-page";
import { PrivateRoute } from "../components/private-route";
// Import Routes
import * as routes from "../routes";

toast.configure({
  autoClose: 5000,
});

const CommonPage: FC = () => (
  <Page header={<Header />} footer={<Footer />}>
    <ToastContainer />
    <Switch>
      <PrivateRoute path={routes.CHECKOUT} redirect={routes.STORE}>
        <CheckoutPage />
      </PrivateRoute>
      <Route path={routes.SERVICES} component={ServicesPage} />
      <Route path={routes.RECIPIES} component={RecipesPage} />
      <Route path={routes.STORE} component={StorePage} />
      <Route exact path={routes.CONTACT} component={ContactPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </Page>
);

export default CommonPage;
