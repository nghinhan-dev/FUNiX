import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/slice/uiSlice";
import classes from "./CartButton.module.css";

const CartButton = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
