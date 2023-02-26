
const initialState = {
    hoursUntilExpiration: 0,
    days: 0,
    dayStreakLoading: false,
    loadError: "",
    nextStreakRecordAvailable: false,
    fetchDetails: true,
}

const configureHoursUntil = expiresAt => {
    // This will work for most use cases except for at the end of a month.
    let todaysDate = new Date();
    let expirationDate = new Date(Date.parse(expiresAt));
    if (todaysDate.getDate() > expirationDate.getDate()) {
        return 0;
    } else if (todaysDate.getDate() <= expirationDate.getDate()) {
        let todaysHour = todaysDate.getHours();
        let difference = 24 - todaysHour;
        return difference;
    } 
}

const configureNextDayAvailable = updatedAt => {
    let todaysDate = new Date();
    let expirationDate = new Date(Date.parse(updatedAt));
    if (expirationDate.getDate() - todaysDate.getDate() >= 1) {
        return true;
    } else {
        return false;
    }
}

const dayStreakReducer = (state=initialState, action) => {
    switch(action.type) {
        case "DAY_STREAK_FETCH_SUCCESS":
            let {dayStreak} = action;
            let hoursUntilExpiration = dayStreak.expiresAt === "" ? 0 : configureHoursUntil(dayStreak.expiresAt);
            let nextDayAvailable = dayStreak.updatedAt === "" ? true : configureNextDayAvailable(dayStreak.updatedAt);
            return {
                ...state,
                loadError: "",
                dayStreakLoading: false,
                days: dayStreak.days,
                hoursUntilExpiration: hoursUntilExpiration,
                nextStreakRecordAvailable: nextDayAvailable,
                fetchDetails: false,
            }
        case "DAY_STREAK_FETCH_ERROR":
            return {
                ...state,
                dayStreakLoading: false,
                loadError: action.message,
                fetchDetails: false,
            }
        case "FETCHING_DAY_STREAK":
            return {
                ...state,
                dayStreakLoading: true,
                loadError: "",
            }
        default: 
            return {
                ...state,
            } 
    }
}

export default dayStreakReducer;