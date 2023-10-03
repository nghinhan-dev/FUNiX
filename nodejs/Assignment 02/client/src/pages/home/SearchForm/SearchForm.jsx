import { useState } from "react";
import { useSearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { search } from "../../../util/search";
import { DateRange } from "react-date-range";
import { formatDate } from "../../../util/formatDate";

export default function SearchForm() {
  const navigate = useNavigate();
  const { searchContext, setSearchContext } = useSearchContext();
  const [isShowDateInput, setShowState] = useState(false);

  const [dateInput, setDateInput] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const selecDateHandler = (selection) => {
    const startDate = formatDate(selection.startDate);
    const endDate = formatDate(selection.endDate);

    setDateInput([selection]);

    setSearchContext((prevState) => ({
      ...prevState,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  const submitSearchForm = async (e) => {
    e.preventDefault();
    // console.log("searchContext:", searchContext);
    const data = await search(searchContext);
    setSearchContext((prevState) => ({ ...prevState, result: data }));
    navigate("/search");
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
              setSearchContext((prevState) => ({
                ...prevState,
                city: e.target.value,
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
              searchContext.startDate === ""
                ? "Click the icon"
                : searchContext.startDate
            } to ${
              searchContext.endDate === "" ? "pick date" : searchContext.endDate
            }`}
            onChange={() => 1}
          />
        </div>
        <div className="roomInput">
          <i className="fa-solid fa-person"></i>
          <p>Adult</p>
          <input
            onChange={(e) =>
              setSearchContext((prevState) => ({
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
              setSearchContext((prevState) => ({
                ...prevState,
                child: e.target.value,
              }))
            }
            type="text"
            placeholder="0"
          />
          <i className="fa-solid fa-door-open"></i>
          <p>Room</p>
          <input
            onChange={(e) =>
              setSearchContext((prevState) => ({
                ...prevState,
                room: e.target.value,
              }))
            }
            type="text"
            placeholder="1"
          />
        </div>
        {/* <Link to={"/Search"} className="btn">
          Search
        </Link> */}
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </>
  );
}
