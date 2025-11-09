import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productsSlice from "./slices/productsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products : productsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;