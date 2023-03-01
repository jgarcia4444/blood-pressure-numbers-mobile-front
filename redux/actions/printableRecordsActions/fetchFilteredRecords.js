import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const fetchFilteredRecords = dateRange => {
    let {fromDate, toDate, userId} = dateRange;
    let url = `${baseUrl}records/filter/date-range/${fromDate.toString()}/${toDate.toString()}/${userId}`;
    return async dispatch => {
        dispatch({type: "FETCHING_FILTERED_RECORDS"});
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {filteredRecords} = data;
                    return dispatch({type: "FILTERED_RECORDS_FETCHED_SUCCESS", filteredRecords});
                    // add in a check if the filtered records are empty alert the user.
                } else {
                    let {error} = data;
                    let {message} = error;
                    return dispatch({type: "FILTERED_RECORDS_FETCHED_ERROR", message})
                }
            })
    }
}

export default fetchFilteredRecords;