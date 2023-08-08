import { useState } from "react";
import navData from "/data/navBar.json";
import NavbarItem from "./NavbarItem/NavbarItem";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

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
          </div>
          <div className="userLogin">
            {user !== null && <p>{user.email}</p>}
            {user === null ? (
              <>
                <Link className="btn" to={`/register`}>
                  <p className="homePage">Register</p>
                </Link>
                <Link className="btn" to={`/login`}>
                  <p className="homePage">Login</p>
                </Link>
              </>
            ) : (
              <>
                <Link className="btn" to={`/transaction`}>
                  <p className="homePage">Transactions</p>
                </Link>
                <button className="btn" onClick={logOut}>
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
        <div className="navitemlist">{renderNavItem}</div>
      </div>
    </section>
  );
}
