import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    UPDATE_CART(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
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
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      } else {
        state.items[existedItemIndex].quantity++;
        state.items[existedItemIndex].totalPrice =
          state.items[existedItemIndex].totalPrice + newItem.price;
        state.totalQuantity++;
      }
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartAction = cartSlice.actions;
export default store;
