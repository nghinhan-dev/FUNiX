import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SearchForm() {
  const [isShowDateInput, setShowState] = useState(false);
  const [pickedDate, setPickedDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [dateInput, setDateInput] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  let selecDateHandler = (selection) => {
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    const formattedstartDate = startDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const formattedendDate = endDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    setDateInput([selection]);

    setPickedDate(() => ({
      startDate: formattedstartDate,
      endDate: formattedendDate,
    }));
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
      <form id="search" action="#">
        <div>
          <i className="fa fa-map-marker-alt"></i>
          <input type="text" placeholder="Where are you going?" />
        </div>
        <div>
          <i
            onClick={() => setShowState((prevState) => !prevState)}
            className="fa fa-calendar-alt btnCalender"
          ></i>
          <input
            type="text"
            value={`${
              pickedDate.startDate === ""
                ? "Click the icon"
                : pickedDate.startDate
            } to ${
              pickedDate.endDate === "" ? "pick date" : pickedDate.endDate
            }`}
            onChange={() => console.log("Updated date!")}
          />
        </div>
        <div>
          <i className="fa fa-child"></i>
          <input
            type="text"
            placeholder="1 adult &#183; 1 child &#183; 1 room"
          />
        </div>
        <Link to={"/Search"} className="btn">
          Search
        </Link>
      </form>
    </>
  );
}
