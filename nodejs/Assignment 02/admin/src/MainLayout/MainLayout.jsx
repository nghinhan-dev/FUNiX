import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div id="main-layout">
        <h2>Admin Page</h2>
        <Navbar />
      </div>
      <Outlet />
    </>
  );
}
