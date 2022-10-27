
const initialState = {
    userRecords: [],
    loadingUserRecords: false,
    loadingUserRecordsError: "",
}

const recordsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "LOADING_RECORDS":
            return {
                ...state,
                loadingUserRecordsError: '',
                loadingUserRecords: true,
            }
        case "RECORDS_LOAD_SUCCESS":
            return {
                ...state,
                loadingUserRecords: false,
                userRecords: action.userRecords,
            };
        case "RECORDS_LOAD_ERROR":
            return {
                ...state,
                loadingUserRecords: false,
                loadingUserRecordsError: action.error,
            }
        default:
            return {
                ...state,
            }
    }
}

export default recordsReducer;