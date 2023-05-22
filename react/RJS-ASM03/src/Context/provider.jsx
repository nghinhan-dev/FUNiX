/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { CurrentUserContext } from "./context";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    if (getCurrentUser !== {}) {
      setCurrentUser(getCurrentUser);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
