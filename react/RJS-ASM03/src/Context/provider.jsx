/* eslint-disable react/prop-types */
import { useState } from "react";

import { CurrentUserContext } from "./context";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
