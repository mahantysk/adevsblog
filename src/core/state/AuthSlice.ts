import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    user: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
