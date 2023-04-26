import { useContext, useState } from "react";
import { CartContext, CartDispatchContext } from "../Context/CartContext";

export default function CartItem({ item }) {
  const dispatch = useContext(CartDispatchContext);
  const [newItem, setNewItem] = useState(item);

  const updateCartOrder = (isMinus) => {
    if (isMinus) {
      dispatch({
        type: "MINUS",
        id: newItem.id,
      });
    } else {
      dispatch({
        type: "ADD",
        item: newItem,
      });
    }
  };

  return (
    <div className="cart__item">
      <div className="item__info">
        <strong>{item.name}</strong>
        <div className="item__price">
          <p className="price">${item.price}</p>
          <p className="amount">
            X <span>{item.amount}</span>
          </p>
        </div>
      </div>
      <div className="item__modify">
        <button className="btn" onClick={() => updateCartOrder(true)}>
          <i className="fa fa-minus"></i>
        </button>
        <button className="btn" onClick={() => updateCartOrder(false)}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
