
const initialState = {
    savingRecord: false,
    recordPersistanceError: "",
}

const addRecordReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case "SAVING_RECORD":
            return {
                ...initialState,
                savingRecord: true,
            }
        case "RECORD_SAVED":
            return {
                ...initialState,
            }
        case "RECORD_ERROR":
            return {
                savingsRecord: false,
                recordPersistanceError: action.error,
            }
        default: 
            return {
                ...state,
            }
    }
}

export default addRecordReducer;