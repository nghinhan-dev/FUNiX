import Navbar from "./Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth === null) {
    navigate("/login");
  }

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
