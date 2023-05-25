import UserProvider from "../Context/provider";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import ChatRoom from "./ChatRoom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Layout() {
  const [isScrolled, setIsScroll] = useState(false);
  const [isChat, setIsChat] = useState(true);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 2150) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <UserProvider>
      <MyNavbar />
      <Outlet />
      <i
        onClick={() => {
          setIsChat((prevState) => !prevState);
        }}
        id="chatToggle"
        className={`fa-brands fa-facebook-messenger ${
          isScrolled ? "isScrolled" : null
        }`}
      ></i>
      {isChat &&
        createPortal(<ChatRoom />, document.getElementsByTagName("body")[0])}
      <Footer />
    </UserProvider>
  );
}
