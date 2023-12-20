import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "./Auth/LoginContext";

export default function Layout() {
  const { user, setUser } = useLogin();
  const navigate = useNavigate();

  const logOut = async () => {
    const res = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("res:", res);

    if (res.ok) {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <>
      <header className="main-header">
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "active main-header__item" : "main-header__item"
              }
            >
              Shop
            </NavLink>

            <NavLink
              to={"/add-product"}
              className={({ isActive }) =>
                isActive ? "active main-header__item" : "main-header__item"
              }
            >
              Add Product
            </NavLink>
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive ? "active main-header__item" : "main-header__item"
              }
            >
              Cart
            </NavLink>
            <NavLink
              to={"/checkout"}
              className={({ isActive }) =>
                isActive ? "active main-header__item" : "main-header__item"
              }
            >
              Order
            </NavLink>
          </ul>
          {user !== null ? (
            <a className="main-header__item" onClick={logOut}>
              Logout
            </a>
          ) : (
            <NavLink
              to={"/login"}
              // onClick={() => user && logOut()}
              className={({ isActive }) =>
                isActive ? "active main-header__item" : "main-header__item"
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}
