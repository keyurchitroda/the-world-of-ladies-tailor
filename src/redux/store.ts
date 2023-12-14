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

const reducers = combineReducers({
  categoryReducer,
  readymadeProductReducer,
  customizeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""], // only these reducers will be persisted
  blacklist: ["categoryReducer", "readymadeProductReducer"],
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
