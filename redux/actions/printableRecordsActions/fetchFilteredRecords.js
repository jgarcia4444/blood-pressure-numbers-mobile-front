import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const fetchFilteredRecords = dateRange => {
    let {fromDate, toDate} = dateRange;
    let url = `${baseUrl}records/filter/date-range/${fromDate}/${toDate}`;
    return async dispatch => {
        dispatch({type: "FETCHING_FILTERED_RECORDS"});
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {filteredRecords} = data;
                    return dispatch({type: "FILTERED_RECORDS_FETCHED_SUCCESS", filteredRecords});
                } else {
                    let {error} = data;
                    let {message} = error;
                    return dispatch({type: "FILTERED_RECORDS_FETCHED_ERROR", message})
                }
            })
    }
}

export default fetchFilteredRecords;