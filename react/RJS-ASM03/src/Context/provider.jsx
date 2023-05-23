/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CurrentUserContext } from "./context";
import { UserArr } from "./context";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userArr, setUserArr] = useState(
    JSON.parse(localStorage.getItem("userArr")) || []
  );

  useEffect(() => {
    const getCurrentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    setCurrentUser(getCurrentUser);
  }, []);

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
