import { createContext, useReducer } from "react";

export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={cartState}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

function cartReducer(cartState, action) {
  switch (action.type) {
    case "ADD": {
      const newItem = action.item;

      // existingItem will = undified if newItem is the first item
      const existingItemIndex = cartState.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingItem = cartState.items[existingItemIndex];

      // new totalAmount value in cartState
      const updatedTotalAmount =
        cartState.totalAmount + newItem.price * newItem.amount;

      let updatedItems;

      if (existingItem) {
        // update item was added before in items[]
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + newItem.amount,
        };
        updatedItems = [...cartState.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // the first item added to items[]
        updatedItems = cartState.items.concat(newItem);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "MINUS": {
      const minusItemIndex = cartState.items.findIndex(
        (item) => item.id === action.id
      );

      // take 1 amount away from the Item
      const minusItem = {
        ...cartState.items[minusItemIndex],
        amount: cartState.items[minusItemIndex].amount - 1,
      };

      const updatedTotalAmount = cartState.totalAmount - minusItem.price;

      let updatedItems;
      if (minusItem.amount === 0) {
        updatedItems = cartState.items.filter(
          (item) => item.id !== minusItem.id
        );
      } else {
        updatedItems = [...cartState.items];
        updatedItems[minusItemIndex] = minusItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "ORDER": {
      return {
        items: [],
        totalAmount: 0,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialCart = {
  items: [],
  totalAmount: 0,
};
