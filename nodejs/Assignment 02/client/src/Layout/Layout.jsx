import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { SearchProvider } from "../context/SearchContext";

export default function Layout() {
  return (
    <SearchProvider>
      <UserProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </UserProvider>
    </SearchProvider>
  );
}
