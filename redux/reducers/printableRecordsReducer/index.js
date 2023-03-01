
const initialState = {
    fetchingFilteredRecords: false,
    fromDateError: "",
    toDateError: "",
    fetchFilteredRecordsError: "",
    filteredRecords: [],
};

const printableRecordsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FILTERED_RECORDS_RANGE_ERROR":
            let {errors} = action;
            return {
                ...initialState,
                fromDateError: errors.fromDateError,
                toDateError: errors.toDateError,
            }
        case "FILTERED_RECORDS_FETCHED_ERROR":
            return {
                ...initialState,
                fetchFilteredRecordsError: action.message,
            }
        case "FILTERED_RECORDS_FETCHED_SUCCESS":
            return {
                ...initialState,
                filteredRecords: action.filteredRecords,
            }
        case "FETCHING_FILTERED_RECORDS":
            return {
                ...initialState,
                fetchingFilteredRecords: true,
            }
        default: 
            return {
                ...state
            }
    }
};

export default printableRecordsReducer;