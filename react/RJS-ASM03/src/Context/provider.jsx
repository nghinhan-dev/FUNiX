/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UserArr } from "./context"; // user array context
import { CurrentUserContext } from "./context"; // current__user context
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/store";

export default function UserProvider({ children }) {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.currentUserIndex.index);
  const cart = useSelector((state) => state.cart);

  const [currentUser, setCurrentUser] = useState(null);
  const [userArr, setUserArr] = useState(
    JSON.parse(localStorage.getItem("userArr")) || []
  );

  // get the last user didn't log out
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (currentUser !== null) {
      dispatch(cartAction.UPDATE_CART(currentUser.cart));
    }
    setCurrentUser(currentUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save NEW current_user & user_arr state when cart change
  useEffect(() => {
    if (currentUser) {
      let updateCurrentUserArr = currentUser;
      updateCurrentUserArr.cart = cart;
      setCurrentUser(updateCurrentUserArr);
      localStorage.setItem(
        "CURRENT_USER",
        JSON.stringify(updateCurrentUserArr)
      );

      let updateUserArr = userArr;
      updateUserArr[currentIndex] = currentUser;
      setUserArr(updateUserArr);
      localStorage.setItem("userArr", JSON.stringify(updateUserArr));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    // Save the userArr to localStorage when a new user sign-up
    localStorage.setItem("userArr", JSON.stringify(userArr));
  }, [userArr]);

  return (
    <UserArr.Provider value={{ userArr, setUserArr }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    </UserArr.Provider>
  );
}
