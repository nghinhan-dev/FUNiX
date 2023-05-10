import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slice/uiSlice";
import cartSlice from "./slice/cartSlice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
