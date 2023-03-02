
import Urls from "../../../config/networking/Urls";
const { baseUrl } = Urls;

const createUser = (userInfo) => {
    console.log("Create User triggerred!!!")
    let url = `${baseUrl}users`;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            new_user_info: {
                ...userInfo,
            }
        })
    }

    return async dispatch => {
        dispatch({type: "SIGNING_UP"});
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log("Here is the data sent from the users create route.")
                let {success} = data;
                if (success === true) {
                    let {userInfo} = data;
                    return dispatch({type: "SIGN_UP_SUCCESS", userInfo})
                } else {
                    let {errors} = data;
                    return dispatch({type: "SIGN_UP_ERROR", errors});
                }
            })
    }
}

export default createUser;