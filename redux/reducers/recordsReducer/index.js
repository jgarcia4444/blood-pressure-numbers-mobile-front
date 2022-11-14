
const initialState = {
    userRecords: [{systolic: 140, diastolic: 90, dateRecorded: "10/27/22"}, {systolic: 120, diastolic: 80, dateRecorded: "10/28/22"}],
    loadingUserRecords: false,
    loadingUserRecordsError: "",
}

const recordsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RECORD_SAVED": 
            return {
                ...state,
                userRecords: state.userRecords.concat(action.persistedRecord),
                loadingUserRecords: false,
                loadingUserRecordsError: "",
            }
        case "FETCHING_RECORDS":
            return {
                ...state,
                loadingUserRecordsError: '',
                loadingUserRecords: true,
            }
        case "RECORDS_FETCH_SUCCESS":
            return {
                ...state,
                loadingUserRecords: false,
                userRecords: action.userRecords,
            };
        case "RECORDS_FETCH_ERROR":
            return {
                ...state,
                loadingUserRecords: false,
                loadingUserRecordsError: action.errorMessage,
            }
        default:
            return {
                ...state,
            }
    }
}

export default recordsReducer;