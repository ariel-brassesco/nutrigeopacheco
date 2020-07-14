import React, { Component } from "react";
import {Switch, HashRouter, Route} from 'react-router-dom';
import {NavBar} from './components/Navigation';
import MainPage from "./pages/MainPage";
//import {DetailPage} from "./pages/DetailPage";



class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
        <Switch>
          <Route exact path='/' component={MainPage} />
          {/*<Route path='/detail' component={DetailPage} />*/}
          {/*<Route component={NotFound}/>*/}
        </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;