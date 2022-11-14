import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;


const fetchUserRecords = (userId) => {
    let url = `${baseUrl}records/${userId}`;
    return async dispatch => {
        dispatch({type: "FETCHING_RECORDS"});
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {userRecords} = data;
                    return dispatch({type: "RECORDS_FETCH_SUCCESS", userRecords});
                } else {
                    let {errors} = data;
                    let message = errors[0].message;
                    return dispatch({type: "RECORDS_FETCH_ERROR", errorMessage: message});
                }
            })
    }
}

export default fetchUserRecords;