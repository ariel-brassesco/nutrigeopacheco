import fetchGetDataReducer from './fetchGetDataReducer';
import {
    FETCH_PROMOTIONS_PENDING,
    FETCH_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_ERROR
} from '../actions/actionsPromotions';
/* Define the reducer for promotions
    The fetchGetDataReducer is a function how take
    usual actions for fetch data (PENDING, SUCCESS, ERROR)
    and return a reducer with the actions passed.
    It is a Reducer Generator for fetching data.
*/

export const promotionsReducer = fetchGetDataReducer(
    FETCH_PROMOTIONS_PENDING,
    FETCH_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_ERROR)

// Define getters from the state
export const getPromotions = state => state.promotions.data;
export const getPromotionsPending = state => state.promotions.pending;
export const getPromotionsError = state => state.promotions.error;;