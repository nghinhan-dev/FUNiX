/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/slice/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, title, quantity, totalPrice, price } = props.item;

  const disPatch = useDispatch();
  const addItemHanlder = () => {
    disPatch(
      cartActions.addItem({
        id,
        title,
        price,
      })
    );
  };

  const removeItemHanlder = () => {
    disPatch(cartActions.removeItem(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHanlder}>-</button>
          <button onClick={addItemHanlder}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
