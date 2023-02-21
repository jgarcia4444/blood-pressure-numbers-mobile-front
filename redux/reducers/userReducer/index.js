const initialState = {
    userId: "",
    email: "",
    authenticationLoading: false,
    recordsCount: 0,
    autenticationError: "",
    passwordChangeInfo: {
        codeSending: false,
        codeSendError: "",
        codeVerificationError: "",
        passwordDisplay: '',
        verificationProcessing: false,
        updatingPassword: false,
        passwordUpdateError: "",
    },
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RESET_PASSWORD_DISPLAY":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    passwordDisplay: "",
                }
            }
        case "PASSWORD_UPDATE_SUCCESS":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    updatingPassword: false,
                    passwordUpdateError: "",
                    passwordDisplay: "password_updated",
                }
            }
        case "PASSWORD_UPDATE_ERROR":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    passwordUpdateError: action.message,
                    updatingPassword: false,
                }
            }
        case "UPDATING_PASSWORD":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    updatingPassword: true,
                    passwordUpdateError: "",
                }
            }
        case "CODE_VERIFICATION_SUCCESS":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    verificationProcessing: false,
                    codeVerificationError: "",
                    passwordDisplay: 'change_password',
                }
            }
        case "CODE_VERIFICATION_ERROR":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    verificationProcessing: false,
                    codeVerificationError: action.message,
                }
            }
        case "VERIFYING_CODE":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    verificationProcessing: true,
                },
            }
        case "CODE_SEND_SUCCESS": 
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    codeSending: false,
                    codeSendError: "",
                    passwordDisplay: 'code',
                }
            }
        case "CODE_SEND_ERROR":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    codeSendError: action.message,
                    codeSending: false,
                }
            }
        case "SENDING_CODE":
            return {
                ...state,
                passwordChangeInfo: {
                    ...state.passwordChangeInfo,
                    codeSending: true,
                    codeSendError: ""
                }
            }
        case "RECORDS_FETCH_SUCCESS":
            return {
                ...state,
                recordsCount: action.userRecords.length,
            }
        case "RESET_USER_INFO": 
            return {
                ...initialState,
            }
        case 'persist/REHYDRATE':
            if (action.payload !== undefined) {
                return {
                    ...state,
                    ...action.payload.user,
                }
            } else {
                return {
                    ...state,
                }
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