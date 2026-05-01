import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isAuthenticated"],
};

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["theme"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    ui: persistReducer(uiPersistConfig, uiReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
