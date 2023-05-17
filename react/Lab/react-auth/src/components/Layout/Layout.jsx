/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider";
import MainNavigation from "./MainNavigation";

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <MainNavigation />
        <main>{children}</main>
        <Outlet />
      </AuthProvider>
    </>
  );
}
