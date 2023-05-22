import UserProvider from "../Context/provider";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <UserProvider>
      <MyNavbar />
      <Outlet />
      <Footer />
    </UserProvider>
  );
}
