const initialState = {
    userId: "",
    email: "",
    authenticationLoading: false,
    recordsCount: 0,
    autenticationError: ""
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
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