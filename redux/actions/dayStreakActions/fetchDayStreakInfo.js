import Urls from "../../../config/networking/Urls";
const {baseUrl} = Urls;

const fetchDayStreakInfo = userId => {
    let url = `${baseUrl}/day-streak/${userId}`;
    return async dispatch => {
        dispatch({type: "FETCHING_DAY_STREAK"});
        setTimeout(() => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    let {success} = data;
                    if (success === true) {
                        let {dayStreak} = data;
                        return dispatch({type: "DAY_STREAK_FETCH_SUCCESS", dayStreak});
                    } else {
                        let {error} = data;
                        let {message} = error;
                        return dispatch({type: "DAY_STREAK_FETCH_ERROR", message});
                    }
                })
        }, 1000);
    }
}

export default fetchDayStreakInfo;