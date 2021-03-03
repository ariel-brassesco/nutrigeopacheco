import "./styles/main.css";
import "@fortawesome/fontawesome-free/js/all";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import ContactPage from "./pages/contact-page";
import StorePage from "./pages/store-page";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/tienda" component={StorePage} />
          <Route exact path="/contacto" component={ContactPage} />
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
