import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      state.changed = true;
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
      state.changed = true;
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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
      );

      if (!response.ok) {
        throw new Error("Can not fetch data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoti({
          status: "error",
          title: "Error!",
          mesg: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
