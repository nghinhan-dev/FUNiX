import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id="layout-nav">
      <ul>
        <p>Hello sillywhale!</p>
        <Link to={"/logout"}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </Link>
        <p>Database</p>
        <Link to={"/users"}>
          <i className="fa-solid fa-user"></i>users
        </Link>
        <Link to={"/hotels"}>
          <i className="fa-solid fa-hotel"></i>hotels
        </Link>
        <Link to={"/room_type"}>
          <i className="fa-solid fa-grip-vertical"></i>room_type
        </Link>
        <Link to={"/rooms"}>
          <i className="fa-solid fa-bed"></i>rooms
        </Link>
        <Link to={"/transactions"}>
          <i className="fa-solid fa-file-invoice-dollar"></i>transactions
        </Link>
      </ul>
    </nav>
  );
}
