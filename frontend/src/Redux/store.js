import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import { adminSlice } from "./features/adminSlice";
import {articleSlice} from "./features/articleSlice";
import {eventSlice} from "./features/eventSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userSlice.reducer,
  admin: adminSlice.reducer,
  article: articleSlice.reducer,
  events: eventSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,reducer);

export default configureStore({
  reducer:persistedReducer
});