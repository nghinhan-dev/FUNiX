import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <div id="main-layout">
        <h2>Admin Page</h2>
        <Navbar />
      </div>
      <Outlet />
      <ToastContainer />
    </>
  );
}
