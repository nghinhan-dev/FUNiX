import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      <Outlet />
    </>
  );
};

export default Layout;
