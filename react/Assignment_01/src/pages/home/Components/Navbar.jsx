import { useState } from "react";
import navData from "/data/navBar.json";
import NavbarItem from "../NavbarItem/NavbarItem";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <div className="changeRoute">
            <Link to={`/`}>
              <p className="homePage">Booking Websites</p>
            </Link>
            <Link to={`/Search`}>
              <button className="btn">Go to Search Page</button>
            </Link>
            <Link to={`/Detail`}>
              <button className="btn">Go to Detail Page</button>
            </Link>
          </div>
          <div className="userLogin">
            <button className="btn">Register</button>
            <button className="btn">Login</button>
          </div>
        </div>
        <div className="navitemlist">{renderNavItem}</div>
      </div>
    </section>
  );
}
