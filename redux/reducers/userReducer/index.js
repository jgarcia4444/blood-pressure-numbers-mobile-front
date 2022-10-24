const initalState = {
    userId: "",
    email: "",
    authenticationLoading: false,
}

const userReducer = (state=initalState, action) => {
    switch(action.type) {
        case "SIGN_UP_SUCCESS":
            return {
                ...state,
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
            return state;
    }
}

export default userReducer;