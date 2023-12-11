/* eslint-disable react/prop-types */
import { useState } from "react";
import { LoginContext } from "./LoginContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
