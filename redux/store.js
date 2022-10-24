import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
})


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({reducer: persistedReducer});
const persistor = persistStore(store);

export default {
    store,
    persistor
};