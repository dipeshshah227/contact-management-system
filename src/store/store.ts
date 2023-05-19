import { configureStore } from "@reduxjs/toolkit";
import authslice from "../slice/authslice";

const store = configureStore({
  reducer: {
    authentication: authslice,
  },
});
export default store;
