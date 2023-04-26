import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CartModal from "./CartModal";

export default function Cart({ cartState }) {
  const [showCartModal, setShowCartModal] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    if (showCartModal) {
      const node = cartRef.current;
      node.classList.add("click__cart");

      return () => {
        node.classList.remove("click__cart");
      };
    }
  }, [showCartModal]);

  return (
    <>
      <div
        ref={cartRef}
        className="cart row"
        onClick={() => setShowCartModal(true)}
      >
        <i className="fa fa-cart-plus"></i>
        <h5>Your Cart</h5>
        <p className="cartNum row">
          {cartState.items.reduce((accumulator, item) => {
            return accumulator + item.amount;
          }, 0)}
        </p>
      </div>

      {showCartModal &&
        createPortal(
          <CartModal
            key={"bzxy475hn02370s9fd"}
            exitCart={() => {
              setShowCartModal(false);
            }}
          />,
          document.getElementById("background")
        )}
    </>
  );
}
