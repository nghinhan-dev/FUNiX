import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { auth, setAuth } = useAuth();

  return (
    <nav id="layout-nav">
      <ul>
        {auth ? (
          <>
            <p>Hello {auth?.username}!</p>
            <a onClick={() => setAuth(null)}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
            <p>Database</p>
            <Link to={"/users"}>
              <i className="fa-solid fa-user"></i>users
            </Link>
            <Link to={"/hotel"}>
              <i className="fa-solid fa-hotel"></i>hotels
            </Link>
            <Link to={"/type"}>
              <i className="fa-solid fa-grip-vertical"></i>room_type
            </Link>
            <Link to={"/rooms"}>
              <i className="fa-solid fa-bed"></i>rooms
            </Link>
            <Link to={"/transactions"}>
              <i className="fa-solid fa-file-invoice-dollar"></i>transactions
            </Link>
          </>
        ) : (
          <p>Login</p>
        )}
      </ul>
    </nav>
  );
}
