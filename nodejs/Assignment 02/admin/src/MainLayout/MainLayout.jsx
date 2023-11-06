import Navbar from "./Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Login from "../Login/Login";

export default function MainLayout() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div id="main-layout">
        <h2 onClick={() => navigate("/")}>Admin Page</h2>
        <Navbar />
      </div>
      {auth !== null ? <Outlet /> : <Login />}
      <ToastContainer autoClose={700} />
    </>
  );
}
