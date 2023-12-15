"use client";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./slices/categorySlice";
import readymadeProductReducer from "./slices/readymadeProductSlice";
import customizeReducer from "./slices/customizeSlice";
import commonReducer from "./slices/commonSlice";

const reducers = combineReducers({
  categoryReducer,
  readymadeProductReducer,
  customizeReducer,
  commonReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""], // only these reducers will be persisted
  blacklist: [
    "categoryReducer",
    "readymadeProductReducer",
    "customizeReducer",
    "commonReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
