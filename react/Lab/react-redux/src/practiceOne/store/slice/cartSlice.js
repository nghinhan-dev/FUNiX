import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existedItemIndex = state.items.findIndex(
        (item) => item?.id === newItem.id
      );
      if (existedItemIndex === -1) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
        state.totalQuantity++;
      } else {
        state.items[existedItemIndex].quantity++;
        state.items[existedItemIndex].totalPrice =
          state.items[existedItemIndex].totalPrice + newItem.price;
        state.totalQuantity++;
      }
    },
    removeItem(state, action) {
      const removedItemId = action.payload;
      const removedItemIndex = state.items.findIndex(
        (item) => item.id === removedItemId
      );

      let removedItem = state.items[removedItemIndex];
      if (removedItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removedItemId);
        state.totalQuantity--;
      } else {
        removedItem.quantity--;
        removedItem.totalPrice = removedItem.totalPrice - removedItem.price;
        state.totalQuantity--;
      }
    },
  },
});

export const sendData = (cart) => {
  return async (dispatch) => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNoti({
          status: "pending",
          title: "Sending...",
          mesg: "~~Sending cart data!",
        })
      );

      const response = await fetch(
        "https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart failed!!!");
      }
    };

    try {
      await sendCartData();
      dispatch(
        uiActions.showNoti({
          status: "success",
          title: "Success!",
          mesg: "Sending cart data sucessfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoti({
          status: "error",
          title: "Error!",
          mesg: "Sending cart failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
