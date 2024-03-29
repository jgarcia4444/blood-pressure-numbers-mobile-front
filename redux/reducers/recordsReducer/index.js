
const initialState = {
    userRecords: [],
    loadingUserRecords: false,
    loadingUserRecordsError: "",
    deletingRecord: false,
    recordDeleteError: "",
    updatingRecord: false,
    recordUpdateError: "",
}

const reconfigureRecords = (record, records) => {
    let recordIds = records.map(recordInfo => recordInfo.id)
    let indexOfRecord = recordIds.indexOf(record.id);
    records[indexOfRecord] = record;
    return records;
}

const recordsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RECORD_UPDATE_SUCCESS":
            let recordsWithUpdatedRecord = state.userRecords.map(record => record.id === action.updatedRecord.id ? action.updatedRecord : record);
            return Object.assign({}, state, {
                updatingRecord: false,
                recordUpdateError: "",
                userRecords: recordsWithUpdatedRecord
            });
        case "RECORD_UPDATE_ERROR":
            return {
                ...state,
                updatingRecord: false,
                recordUpdateError: action.message,
            }
        case "UPDATING_RECORD":
            return {
                ...state,
                recordUpdateError: "",
                updatingRecord: true,
            }
        case "RECORD_DELETION_SUCCESS":
            let recordRemoved = state.userRecords.filter(record => record.id !== action.userRecordId);
            return {
                ...state,
                deletingRecord: false,
                recordDeleteError: "",
                userRecords: recordRemoved,
            }
        case "RECORD_DELETION_ERROR":
            return {
                ...state,
                deletingRecord: false,
                recordDeleteError: action.message,
            }
        case "DELETING_RECORD":
            return {
                ...state,
                deletingRecord: true,
            }
        case "LOGGED_OUT_SUCCESS":
            return {
                ...initialState,
            }
        case "RECORD_SAVED": 
            return {
                ...state,
                userRecords: state.userRecords.concat(action.persistedRecord),
                loadingUserRecords: false,
                loadingUserRecordsError: "",
            }
        case "FETCHING_RECORDS":
            return {
                ...state,
                loadingUserRecordsError: '',
                loadingUserRecords: true,
            }
        case "RECORDS_FETCH_SUCCESS":
            return {
                ...state,
                loadingUserRecords: false,
                userRecords: action.userRecords,
            };
        case "RECORDS_FETCH_ERROR":
            return {
                ...state,
                loadingUserRecords: false,
                loadingUserRecordsError: action.errorMessage,
            }
        default:
            return {
                ...state,
            }
    }
}

export default recordsReducer;