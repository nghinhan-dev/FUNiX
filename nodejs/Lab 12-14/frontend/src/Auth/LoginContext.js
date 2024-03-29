import { createContext, useContext } from "react";

export const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}
