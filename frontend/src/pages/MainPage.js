import React, { Component } from 'react';
import Showcase from '../containers/Showcase';
//import {NavBar, NavFilter} from '../components/Navigation';
//import {ShowcaseProducts} from '../components/ShowProducts';

class MainPage extends Component {
    render() {
        const prod = [{
            picture:'',
            title: 'My first product',
            price: 12.5,
        },
        {
            picture:'',
            title: 'My first product',
            price: 12.5,
        }];

        return (
            <Showcase />
        );
    }
}

export default MainPage;
