import { Link, Outlet } from "react-router-dom";
import "./MainNavigation.css";

export default function Navbar() {
  return (
    <>
      <header className="header">
        <p className="logo">Great Qoutes</p>
        <nav className="nav">
          <ul>
            <li>
              <Link to={`all`}>All Quotes</Link>
            </li>
            <li>
              <Link to={`add`}>Add a Quote</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
