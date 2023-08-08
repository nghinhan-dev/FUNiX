import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

export default function Layout() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </UserProvider>
  );
}
