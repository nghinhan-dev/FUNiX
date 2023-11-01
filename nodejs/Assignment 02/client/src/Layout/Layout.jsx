import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { SearchProvider } from "../context/SearchContext";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <SearchProvider>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Footer />
      </UserProvider>
    </SearchProvider>
  );
}
