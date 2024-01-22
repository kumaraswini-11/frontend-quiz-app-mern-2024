import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, userData: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
