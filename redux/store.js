import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import recordsReducer from './reducers/recordsReducer';
import addRecordReducer from './reducers/addRecordReducer';

const rootReducer = combineReducers({
    user: userReducer,
    records: recordsReducer,
    addRecord: addRecordReducer,
})


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer']
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