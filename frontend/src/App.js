import "./styles/main.css";
import "@fortawesome/fontawesome-free/js/all";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

// Import Components
import CommonPage from "./pages/common-page";
import FailurePaymentPage from "./pages/failure-payment";
import SuccessPaymentPage from "./pages/success-payment";
import ProcessingPaymentPage from "./pages/processing-payment";
// Import Routes
import * as routes from "./routes";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={`${routes.SUCCESS_PAYMENT}/:cart_id/`}
            component={ProcessingPaymentPage}
          />
          <Route path={routes.SUCCESS_PAYMENT} component={SuccessPaymentPage} />
          <Route path={routes.FAILURE_PAYMENT} component={FailurePaymentPage} />
          <Route path="/" component={CommonPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
