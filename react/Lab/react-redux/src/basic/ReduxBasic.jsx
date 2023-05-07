import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import "./basic.css";

function ReduxBasic() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      {!isAuth ? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default ReduxBasic;
