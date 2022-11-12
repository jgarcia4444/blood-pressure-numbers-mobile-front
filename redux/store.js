import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import recordsReducer from './reducers/recordsReducer';
import addRecordReducer from './reducers/addRecordReducer';
import createMigrate from 'redux-persist/es/createMigrate';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
    user: userReducer,
    records: recordsReducer,
    addRecord: addRecordReducer,
})
const migrations = {
    0: (state) => {
        console.log("State", state);
        return {
            ...state,
        }
    },
    1: (state) => {
        return {
            ...state,
            user: {
                ...userReducer,
                userId: ""
            }
        }
    },
    2: (state) => {
        return {
            ...state,
            user: {
                ...userReducer
            }
        }
    },
    3: (state) => {
        return {
            ...state,
            user: {
                userId: "",
                email: "",
                authenticationLoading: false,
                recordsCount: 2,
                autenticationError: ""
            }
        }
    },
    4: (state) => {
        return {
            ...state,
            userReducer: {
                userId: "",
                email: "",
                authenticationLoading: false,
                recordsCount: 2,
                autenticationError: ""
            }
        }
    },
    5: (state) => {
        return {
            ...state,
            user: {
                userId: "",
                email: "",
                authenticationLoading: false,
                recordsCount: 2,
                autenticationError: ""
            }
        }
    }
}

const persistConfig = {
    version: 5,
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    migrate: createMigrate(migrations, {debug: true}),
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer, 
    middleware: [thunk]
});

const persistor = persistStore(store);

export default {
    store,
    persistor
};