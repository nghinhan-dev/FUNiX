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
    REMOVE_CART(state, action) {
      const id = action.payload;
      const removeIndex = state.items.findIndex((item) => item.id === id);
      state.totalQuantity -= state.items[removeIndex].quantity;
      state.totalPrice -=
        state.items[removeIndex].quantity * state.items[removeIndex].price;
      state.items.splice(removeIndex, 1);
    },
    MINUS_CART(state, action) {
      const id = action.payload;
      const minusIndex = state.items.findIndex((item) => item.id === id);

      state.totalQuantity--;
      state.totalPrice -= state.items[minusIndex].price;
      if (state.items[minusIndex].quantity !== 1) {
        state.items[minusIndex].quantity--;
      } else {
        state.items.splice(minusIndex, 1);
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
