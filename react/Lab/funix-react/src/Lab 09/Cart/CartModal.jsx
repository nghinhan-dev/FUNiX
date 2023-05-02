import { useContext, useRef, useState } from "react";
import { CartContext } from "../Context/CartContext";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";

export default function CartModal({ exitCart }) {
  const cartForm = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const cartState = useContext(CartContext);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  let renderCartList = cartState.items.map((item) => {
    return <CartItem key={item.id + "cartitem"} item={item} />;
  });

  return (
    <section id="cart">
      <div className="outer__side" onClick={exitCart}></div>
      <div className="cart__container">
        {!showForm && <div className="cart__list">{renderCartList}</div>}
        <div className="cart__order">
          <div className="cart__total">
            <p>Total Amount</p>
            <p>${cartState.totalAmount.toFixed(2)}</p>
          </div>

          <div className="cart__orderBtn">
            <div className="btn" onClick={() => setShowForm(false)}>
              Cancel
            </div>
            <div className="btn order" onClick={() => setShowForm(true)}>
              Order
            </div>
          </div>
        </div>
        {showForm && (
          <form
            className="cart__form"
            onSubmit={handleSubmit(onSubmit)}
            ref={cartForm}
          >
            <label>
              Your Name
              <input
                type="text"
                placeholder="Your Name"
                {...register("yourName", { required: true })}
              />
            </label>

            <label>
              Street
              <input
                type="text"
                placeholder="Street"
                {...register("street", { required: true })}
              />
            </label>

            <label>
              Postal Code
              <input
                type="number"
                placeholder="Postal Code"
                {...register("postalCode", { required: true, min: 10000 })}
              />
            </label>

            <label>
              City
              <input
                type="text"
                placeholder="City"
                {...register("city", { required: true })}
              />
            </label>

            <input type="submit" value="Confirm" />
          </form>
        )}
      </div>
    </section>
  );
}
