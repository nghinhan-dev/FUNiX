import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counter";
import authSliceReducer from "./slice/auth";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSliceReducer,
  },
});

export default store;
