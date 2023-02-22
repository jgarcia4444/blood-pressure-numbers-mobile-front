import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const removeRecord = (recordRemovalInfo) => {
    const {userId, userRecordId} = recordRemovalInfo;
    let url = `${baseUrl}records/delete/${userId}/${userRecordId}`;
    return async dispatch => {
        dispatch({type: "DELETING_RECORD"});
        setTimeout(() => {
            fetch(url, {method: "DELETE"})
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    console.log("Data sent back from the remove record action", data);
                    if (success === true) {
                        return dispatch({type: "RECORD_DELETION_SUCCESS", userRecordId});
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "RECORD_DELETION_ERROR", message});
                    }
                })
        }, 1000);
    }
}

export default removeRecord;