import { useState } from "react";
import navData from "/data/navBar.json";
import NavbarItem from "./NavbarItem/NavbarItem";
import Header from "./Header/Header";

export default function Home() {
  const [navState, setNavState] = useState(navData);

  let changeNavItemState = (title) => {
    let newNavState = navState.map((item) => ({ ...item, active: false }));
    let index = newNavState.findIndex((a) => a.title == title);

    newNavState[index] = { ...newNavState[index], active: true };

    setNavState(() => [...newNavState]);
  };

  let renderNavItem = navState.map((item) => (
    <NavbarItem
      key={item.title + `id`}
      title={item.title}
      icon={item.icon}
      active={item.active}
      itemOnclick={() => changeNavItemState(item.title)}
    />
  ));
  return (
    <section id="navbar">
      <div className="container">
        <div className="navbrand">
          <p>Booking Websites</p>
          <div className="userLogin">
            <button className="btn">Register</button>
            <button className="btn">Login</button>
          </div>
        </div>
        <div className="navitemlist">{renderNavItem}</div>
        <Header />
      </div>
    </section>
  );
}
