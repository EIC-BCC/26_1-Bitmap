import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("auth");
const initialState = stored ? JSON.parse(stored) : { token: null, userId: null, name: null, email: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const next = action.payload;
      localStorage.setItem("auth", JSON.stringify(next));
      return next;
    },
    clearAuth() {
      localStorage.removeItem("auth");
      return { token: null, userId: null, name: null, email: null };
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
