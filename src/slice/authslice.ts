import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    auth: "uncertain",
  },
  reducers: {
    detectState: (state) => {
      if (localStorage.getItem("access_token")) {
        state.auth = "loggedIn";
      }
    },
    setState: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { detectState, setState } = authSlice.actions;
export default authSlice.reducer;
