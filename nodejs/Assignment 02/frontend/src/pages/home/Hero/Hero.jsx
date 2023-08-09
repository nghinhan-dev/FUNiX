import SearchForm from "../SearchForm/SearchForm";
import { useUser } from "../../../context/UserContext";

export default function Hero() {
  const { user } = useUser();

  return (
    <div id="landingPage">
      <div className="container">
        <header>
          <h1>A lifetime of discounts? It's Genius.</h1>
          <p>
            Get rewarded for your travels, unlock instant savings of 10% or more
            with a free account
          </p>
          {user !== null ? (
            <h2
              style={{
                marginBottom: "50px",
                display: "inline-block",
                marginTop: "20px",
              }}
            >
              Welcome back, {user.fullName} !
            </h2>
          ) : (
            <button className="btn">Sign in / Register</button>
          )}
          <SearchForm />
        </header>
      </div>
    </div>
  );
}
