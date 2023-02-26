import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const updateDayStreak = userId => {
    let url = `${baseUrl}/day-streak`;
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({update_info: {
            user_id: userId
        }})
    }
    return async dispatch => {
        fetch({type: "UPDATING_DAY_STREAK"});
        setTimeout(() => {
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    if (success === true) {
                        let {dayStreak} = data;
                        return dispatch({type: "DAY_STREAK_UPDATE_SUCCESS", dayStreak})
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "DAY_STREAK_UPDATE_ERROR", message});
                    }
                })
        },1000);
    }
}

export default updateDayStreak