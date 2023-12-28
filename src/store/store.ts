import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import jobsReducer from "./slices/job.slices";

import companiesReducer from "./slices/company.slices";

import userReducer from "./slices/user.slice";

import applicationsReducer from "./slices/applications.slice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobs: jobsReducer,
  companies: companiesReducer,
  user: userReducer,
  applications: applicationsReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
