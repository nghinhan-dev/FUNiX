/* eslint-disable react/prop-types */
import { useState } from "react";

export default function SearchForm({ getQuery }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getQuery(query);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setQuery("");
    document.getElementById("search-form").reset();
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <div className="container">
        <div className="search-form-container">
          <label htmlFor="search">
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              name="search"
              id="search"
              placeholder="Enter move title..."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <hr />
          <div className="button-grp">
            <button className="btn" onClick={handleReset}>
              Reset
            </button>
            <input className="btn" type="submit" value="Submit" />
          </div>
        </div>
      </div>
    </form>
  );
}
