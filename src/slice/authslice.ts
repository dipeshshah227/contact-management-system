import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {},
  reducers: {
    addUser: (state) => {
      console.log(state);
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
