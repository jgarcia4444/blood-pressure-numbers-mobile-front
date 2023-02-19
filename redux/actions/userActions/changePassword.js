import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;


const changePassword = userId => {
    let url = `${baseUrl}users/verification-code`;
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId}),
    }
    return async dispatch => {
        dispatch({type: "SENDING_CODE"});
        setTimeout(() => {
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    if (success === true) {
                        return dispatch({type: "CODE_SEND_SUCCESS"});
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "CODE_SEND_ERROR", message});
                    }
                })
        }, 1000);
    }
}

export default changePassword;