
const logoutUser = () => {
    return async dispatch => {
        dispatch({type: 'LOGGING_OUT'});
        setTimeout(() => {
            return dispatch({type: "LOGGED_OUT_SUCCESS"});
        }, 1500);
    }
}

export default logoutUser