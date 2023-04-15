import SearchForm from "../SearchForm/SearchForm";

export default function Header() {
  return (
    <header>
      <h1>A lifetime of discounts? It's Genius.</h1>
      <p>
        Get rewarded for your travels, unlock instant savings of 10% or more
        with a free account
      </p>
      <button className="btn">Sign in/ Register</button>

      <SearchForm />
    </header>
  );
}
