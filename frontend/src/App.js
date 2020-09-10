import React, { Component } from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from "./pages/MainPage";

export const URL_API_PRODUCTS = location.origin + '/api/products';
export const URL_API_CATEGORIES = location.origin + '/api/category';
export const URL_API_PROMOTIONS = location.origin + '/api/promotion';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/tienda'>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/:category' component={MainPage} />
          <Route exact path='/:category/:product' component={MainPage} />
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;