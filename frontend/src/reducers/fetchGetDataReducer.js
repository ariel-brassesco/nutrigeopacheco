// Define a Reducer Generator form the actions passed
// It is a reducer for fetch data with the usual actions: PENDING, SUCCESS, ERROR
export default (
    PENDING_ACTION,
    SUCCESS_ACTION,
    ERROR_ACTION
    ) => function fetchGetDataReducer(
        state = {
            pending: false,
            data: [],
            error: null
        },
        action) {
            switch(action.type) {
                case PENDING_ACTION: 
                    return {
                        ...state,
                        pending: true
                    }
                case SUCCESS_ACTION:
                    return {
                        ...state,
                        pending: false,
                        data: action.payload
                    }
                case ERROR_ACTION:
                    return {
                        ...state,
                        pending: false,
                        error: action.error
                    }
                default: 
                    return state;
            }
        }