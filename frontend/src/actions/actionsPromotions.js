// Define and export actions
export const FETCH_PROMOTIONS_PENDING = 'FETCH_PROMOTIONS_PENDING';
export const FETCH_PROMOTIONS_SUCCESS = 'FETCH_PROMOTIONS_SUCCESS';
export const FETCH_PROMOTIONS_ERROR = 'FETCH_PROMOTIONS_ERROR';

// Define actions creators
function fetchPromotionsPending() {
    return {
        type: FETCH_PROMOTIONS_PENDING
    }
}

function fetchPromotionsSuccess(promotions) {
    return {
        type: FETCH_PROMOTIONS_SUCCESS,
        promotions: promotions
    }
}

function fetchPromotionsError(error) {
    return {
        type: FETCH_PROMOTIONS_ERROR,
        error: error
    }
}

// Export actions creators
export {
    fetchPromotionsPending,
    fetchPromotionsSuccess,
    fetchPromotionsError
};