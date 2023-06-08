import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
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
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
