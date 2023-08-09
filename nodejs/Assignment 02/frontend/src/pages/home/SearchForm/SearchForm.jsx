import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SearchForm() {
  const [searchForm, setSearchForm] = useState({
    startDate: "",
    endDate: "",
  });
  const [isShowDateInput, setShowState] = useState(false);

  const [dateInput, setDateInput] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const selecDateHandler = (selection) => {
    const startDate = selection.startDate;
    const endDate = selection.endDate;

    setDateInput([selection]);

    setSearchForm((prevState) => ({
      ...prevState,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  const submitSearchForm = (e) => {
    e.preventDefault();
    console.log(searchForm);
  };

  return (
    <>
      {isShowDateInput ? (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => selecDateHandler(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={dateInput}
        />
      ) : null}
      <form id="search" onSubmit={submitSearchForm}>
        <div>
          <i className="fa fa-map-marker-alt"></i>
          <input
            onChange={(e) =>
              setSearchForm((prevState) => ({
                ...prevState,
                location: e.target.value,
              }))
            }
            type="text"
            placeholder="Where are you going?"
          />
        </div>
        <div>
          <i
            onClick={() => setShowState((prevState) => !prevState)}
            className="fa fa-calendar-alt btnCalender"
          ></i>
          <input
            type="text"
            value={`${
              searchForm.startDate === ""
                ? "Click the icon"
                : searchForm.startDate
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")
            } to ${
              searchForm.endDate === ""
                ? "pick date"
                : searchForm.endDate
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")
            }`}
            onChange={() => console.log("Updated date!")}
          />
        </div>
        <div className="roomInput">
          <i className="fa-solid fa-person"></i>
          <p>Adult</p>
          <input
            onChange={(e) =>
              setSearchForm((prevState) => ({
                ...prevState,
                adult: e.target.value,
              }))
            }
            type="text"
            placeholder="1"
          />
          <i className="fa fa-child"></i>
          <p>Child</p>
          <input
            onChange={(e) =>
              setSearchForm((prevState) => ({
                ...prevState,
                child: e.target.value,
              }))
            }
            type="text"
            placeholder="1"
          />
          <i className="fa-solid fa-door-open"></i>
          <p>Room</p>
          <input
            onChange={(e) =>
              setSearchForm((prevState) => ({
                ...prevState,
                room: e.target.value,
              }))
            }
            type="text"
            placeholder="1"
          />
        </div>
        <Link to={"/Search"} className="btn">
          Search
        </Link>
        {/* <button type="submit" className="btn">
          Search
        </button> */}
      </form>
    </>
  );
}
