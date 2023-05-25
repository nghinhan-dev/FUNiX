/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CurrentUserContext } from "./context";
import { UserArr } from "./context";
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

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (currentUser !== null) {
      dispatch(cartAction.UPDATE_CART(currentUser.cart));
    }
    setCurrentUser(currentUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // Save the userArr to localStorage
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
