import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userRedux'
import docReducer from './docRedux'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {combineReducers} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    doc: docReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)