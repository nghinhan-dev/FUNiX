/* eslint-disable react/prop-types */
import { useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
