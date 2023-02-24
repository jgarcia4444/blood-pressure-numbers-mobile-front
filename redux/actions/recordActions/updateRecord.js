import Urls from "../../../config/networking/Urls"; 
const {baseUrl} = Urls;

const updateRecord = (updateInfo) => {
    let url = `${baseUrl}/records/update`;
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({update_record_info: updateInfo}),
    };
    return async dispatch => {
        dispatch({type: "UPDATING_RECORD"});
        setTimeout(() => {
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    if (success === true) {
                        let {updatedRecord} = data;
                        return dispatch({type: "RECORD_UPDATE_SUCCESS", updatedRecord});
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "RECORD_UPDATE_ERROR", message});
                    }
                })
        }, 1000)
    }
}

export default updateRecord;