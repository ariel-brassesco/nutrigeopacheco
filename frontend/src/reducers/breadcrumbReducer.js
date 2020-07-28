import {UPDATE_URL} from '../actions/actionsBreadcrumb' 


const INITIAL_BREADCRUMS_STATE = {
    url: '/'
};

export function breadcrumbReducer(state = INITIAL_BREADCRUMS_STATE, action) {
    switch(action.type) {
        case UPDATE_URL:
            return {...state, url: action.url}
        default: 
            return state;
    }
}

export const getUrl = state => state.breadcrumb.url;
