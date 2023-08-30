import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userData from "./userData";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userData"], // only userData will be persisted
};

const rootReducer = combineReducers({
  userData: userData,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Assuming 'persist/PERSIST' is the action causing the issue.
      },
    }),
});

export const persistor = persistStore(store);
