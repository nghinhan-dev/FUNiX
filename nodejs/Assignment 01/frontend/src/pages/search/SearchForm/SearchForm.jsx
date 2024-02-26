/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";

export default function SearchForm() {
  const handleReset = (event) => {
    event.preventDefault();
    document.getElementById("search-form").reset();
  };

  return (
    <Form method="POST" id="search-form">
      <div className="container">
        <div className="search-form-container">
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Enter move title..."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <hr />
          <div className="button-grp">
            <div className="btn" onClick={handleReset}>
              Reset
            </div>
            <input className="btn" type="submit" value="Submit" />
          </div>
        </div>
      </div>
    </Form>
  );
}
