import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import { fetchCartData } from "./store/slice/cartSlice";
import { sendData } from "./store/slice/cartSlice";
import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import "./practiceOne.css";

let isInitial = 0;

function PracticeOne() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch(fetchCartData());
    }

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  useEffect(() => {
    let ignore = false;

    if (isInitial == 0 || isInitial == 1) {
      isInitial++;
      return;
    }

    if (!ignore && cart.changed) {
      dispatch(sendData(cart));
    }

    return () => {
      ignore = true;
    };
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          mesg={notification.mesg}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default PracticeOne;
