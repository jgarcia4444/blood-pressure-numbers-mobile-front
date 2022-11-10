
import Urls from "../../../config/networking/Urls";
const { baseUrl } = Urls;

const addRecord = (recordInfo) => {
    const {userId, systolic, diastolic, notes, rightArmRecorded} = recordInfo;
    const url = `${baseUrl}user/${userId}/records`;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            new_record_info: {
                systolic,
                diastolic,
                notes,
                right_arm_recorded: rightArmRecorded
            }
        })
    }

    return async dispatch => {
        dispatch({type: "SAVING_RECORD"});
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {persistedRecord} = data;
                    return dispatch({type: "RECORD_SAVED", persistedRecord})
                } else {
                    let {errors} = data;
                    return dispatch({type: 'RECORD_ERROR', error: errors[0].message});
                }
            })
    }

}

export default addRecord;