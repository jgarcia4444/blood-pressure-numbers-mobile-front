const initialState = {
    userId: "",
    email: "",
    authenticationLoading: false,
    recordsCount: 0,
    autenticationError: ""
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RECORDS_FETCH_SUCCESS":
            console.log("Fetch success in the user reducer", action.userRecords.length);
            return {
                ...state,
                recordsCount: action.userRecords.length,
            }
        case "RESET_USER_INFO": 
            return {
                ...initialState,
            }
        case 'persist/REHYDRATE':
            return {
                ...state,
                ...action.payload.user,
            }
        case "LOGGING_OUT":
            return {
                ...state,
                authenticationLoading: true,
            }
        case "LOGGED_OUT_SUCCESS":
            return {
                ...initialState,
            }
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                authenticationLoading: false,
                ...action.userInfo,
            }
        case "USER_LOGIN_ERROR":
            return {
                ...state,
                authenticationLoading: false,
            }
        case "LOGGING_IN":
            return {
                ...state,
                authenticationLoading: true,
                authenticationError: "",
            }
        case "SIGN_UP_SUCCESS":
            return {
                ...state,
                ...action.userInfo,
                authenticationLoading: false,
            }
        case "SIGN_UP_ERROR":
            return {
                ...state,
                authenticationLoading: false,
                authenticationError: "There was an error creating your account."
            }
        case "SIGNING_UP":
            return {
                ...state,
                authenticationLoading: true,
            }
        default: 
            return {
                ...state,
            }
    }
}

export default userReducer;