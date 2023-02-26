import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const createDayStreak = userId => {
    let url = `${baseUrl}day-streaks`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({user_id: userId}),
    };
    return async dispatch => {
        dispatch({type: "CREATING_DAY_STREAK"});
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {success} = data;
                if (success === true) {
                    let {dayStreak} = data;
                    return dispatch({type: "DAY_STREAK_CREATE_SUCCESS", dayStreak});
                } else {
                    let {error} = data;
                    let {message} = error;
                    return dispatch({type: "DAY_STREAK_CREATE_ERROR", message});
                }
            })
    }
}

export default createDayStreak;