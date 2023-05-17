import { Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

export default function MainNavigation() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!currentUser ? (
            <li>
              <Link to="/auth">Login | Sign Up</Link>
            </li>
          ) : (
            <li>
              <button onClick={logOutHanlde}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );

  function logOutHanlde() {
    signOut(auth).catch((error) => console.log(error));
    navigate("/auth");
  }
}
