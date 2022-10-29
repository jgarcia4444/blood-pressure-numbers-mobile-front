const initialState = {
    userId: "",
    email: "",
    authenticationLoading: false,
    recordsCount: 2,
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