import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNoti(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        mesg: action.payload.mesg,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
