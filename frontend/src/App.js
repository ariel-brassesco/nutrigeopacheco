import "./styles/main.css";
import "@fortawesome/fontawesome-free/js/all";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

// Import Components
import CommonPage from "./pages/common-page";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={CommonPage} />
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
