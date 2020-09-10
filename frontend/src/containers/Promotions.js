import React, {Component} from 'react';
import {connect} from 'react-redux';
// Import actions creators
import fetchGetData from '../actions/fetchData';
// Import actions
import {
    FETCH_PROMOTIONS_PENDING,
    FETCH_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_ERROR
} from '../actions/actionsPromotions';
// Import getters
import {
    getPromotions,
    getPromotionsError,
    getPromotionsPending,
} from '../reducers/promotionsReducer';
// Import functions
import { saveData } from '../utils/functions';

function BannerGeneralPromotion({promotions}){
    
    let data = promotions.filter(({target}) => target == 'payment')

    return (
        <div className='promotions'>
            {
                data.map( promo => {
                    return (
                        <p key={promo.id} className='promo-gen'>
                            {promo.text}
                        </p>
                    )
                })
            }
        </div>
    )

}

class Promotions extends Component {

    componentDidMount(){
        const {pending, fetchPromotions} = this.props;
        if (!pending) fetchPromotions();
    }

    render() {
        const {promotions, error, pending} = this.props;
        
        if (error) console.error(error);
        // Save the data in localStorage
        if (promotions.length > 0) saveData('promotions', promotions);
        //Return null, nothing to render
        return null;
    }
}

const mapStateToProps = state => {
    return {
        promotions: getPromotions(state),
        pending: getPromotionsPending(state),
        error: getPromotionsError(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPromotions: () => fetchGetData(
            ownProps.url,
            FETCH_PROMOTIONS_PENDING,
            FETCH_PROMOTIONS_SUCCESS,
            FETCH_PROMOTIONS_ERROR
        )(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
export const GeneralPromotion = connect(mapStateToProps, null)(BannerGeneralPromotion);
