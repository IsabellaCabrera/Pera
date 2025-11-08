import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserData } from "../../types/auth";


const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { startLoading, setUser, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;
