import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const updatePassword = (passwordUpdateInfo) => {
    const {userId, newPassword} = passwordUpdateInfo;
    let url = `${baseUrl}users/update-password`;
    let options = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            new_password: newPassword,
        }),
    };
    return async dispatch => {
        dispatch({type: "UPDATING_ PASSWORD"});
        setTimeout(() => {
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    if (success === true) {
                        return dispatch({type: "PASSWORD_UPDATE_SUCCESS"});
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "PASSWORD_UPDATE_ERROR", message});
                    }
                })
        }, 1000)
    }
}

export default updatePassword;