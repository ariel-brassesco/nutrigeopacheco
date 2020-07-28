// Define actions
export const UPDATE_URL = 'UPDATE_URL';
export const UPDATE_TYPE_CATEGORY = 'FILTER_CATEGORY';
export const UPDATE_TYPE_PRODUCT = 'SEARCH_PRODUCT';
export const UPDATE_TYPE_PRODUCT_DETAIL = 'PRODUCT_DETAIL';

// Define and export actions
export function updateURL(type, data){
    let url;
    switch(type) {
        case UPDATE_TYPE_CATEGORY:
            url = '/' + data;
            break;
        case UPDATE_TYPE_PRODUCT:
            if (data) {
                url = '/search?product=' + data;
                break;
            }
        case UPDATE_TYPE_PRODUCT_DETAIL:
            if (Object.keys(data).length ) {
                url = '/' + data.slug;
                break;
            }
        default:
            url = '/';
            break;
    }
    
    return {
        type: UPDATE_URL,
        url
    }
}
