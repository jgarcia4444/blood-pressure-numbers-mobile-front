
import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const loginUser = (userInfo) => {

    let url = `${baseUrl}`
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login_info: {
                ...userInfo,
            }
        })
    }

    return async dispatch => {

        dispatch({type: "LOGGING_IN"});

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {userInfo} = data;
                    return dispatch({type: "USER_LOGIN_SUCCESS", userInfo});
                } else {
                    let {errors} = data;
                    return dispatch({type: "USER_LOGIN_ERROR", errors})
                }
            })

    }

}

export default loginUser;