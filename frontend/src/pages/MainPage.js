import React, { Component } from 'react';
import Showcase from '../containers/Showcase';
import NavFilter from '../containers/NavFilter';
//import Breadcrum from '../containers/Breadcrum';
import Cart from '../containers/Cart';
import Promotions, {GeneralPromotion} from '../containers/Promotions';
import {
    WhatsappContact,
    BannerInfo
} from '../components/Common';

import {
    URL_API_PRODUCTS,
    URL_API_CATEGORIES,
    URL_API_PROMOTIONS
} from '../App';

class MainPage extends Component {
    render() {
        return (
            <div className='mainpage'>
                {/*<Breadcrum />*/}
                <Promotions url={URL_API_PROMOTIONS} />
                <GeneralPromotion />
                <Cart />
                <NavFilter url={URL_API_CATEGORIES} />
                <Showcase url={URL_API_PRODUCTS} />
                <BannerInfo />
                <WhatsappContact />
            </div>
        );
    }
}

export default MainPage;
