import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import CartItem from "./CartItem";

export default function CartModal({ exitCart }) {
  const cartState = useContext(CartContext);

  let renderCartList = cartState.items.map((item) => {
    return <CartItem key={item.id + "cartitem"} item={item} />;
  });

  return (
    <section id="cart">
      <div className="outer__side" onClick={exitCart}></div>
      <div className="cart__container">
        <div className="cart__list">{renderCartList}</div>
        <div className="cart__order">
          <div className="cart__total">
            <p>Total Amount</p>
            <p>${cartState.totalAmount}</p>
          </div>

          <div className="cart__orderBtn">
            <div className="btn">Cancel</div>
            <div className="btn order">Order</div>
          </div>
        </div>
      </div>
    </section>
  );
}
