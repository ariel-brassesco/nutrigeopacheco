import React from 'react';
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import App from "./App";
import appReducer from './reducers/appreducer';


const store = createStore(
    appReducer,
    applyMiddleware(thunk)
);
const root = document.getElementById("app");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    root
);