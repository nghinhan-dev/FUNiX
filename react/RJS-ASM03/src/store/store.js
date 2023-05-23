import { configureStore, createSlice } from "@reduxjs/toolkit";

const currentUserIndexSlice = createSlice({
  name: "currentUserIndex",
  initialState: {
    index: -1,
  },
  reducers: {
    UPDATE_INDEX(state, action) {
      state.index = action.payload;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    UPDATE_CART(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    ADD_CART(state, action) {
      const newItem = action.payload;
      const existedItemIndex = state.items.findIndex(
        (item) => item?.id === newItem.id
      );

      if (existedItemIndex === -1) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity,
          img1: newItem.img1,
        });
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
      } else {
        state.items[existedItemIndex].quantity += newItem.quantity;
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    currentUserIndex: currentUserIndexSlice.reducer,
  },
});

export const cartAction = cartSlice.actions;
export const currentUserIndexAction = currentUserIndexSlice.actions;
export default store;
