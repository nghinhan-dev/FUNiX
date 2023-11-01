import { useSearchContext } from "../../context/SearchContext";
import { useUser } from "../../context/UserContext";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { formatDate } from "../../util/formatDate";
import { search } from "../../util/search";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Search() {
  const { user } = useUser();
  const { searchContext, setSearchContext } = useSearchContext();
  const [isShowDateInput, setShowState] = useState(false);

  const [dateInput, setDateInput] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const searchResult = searchContext.result;

  const renderSearchList = searchResult.map((hotel) => {
    return (
      <div className="search__item" key={hotel._id}>
        <div className="search__img">
          <img src={`${hotel.photos[0]}`} alt={`${hotel.name}`} />
        </div>
        <div className="search__desc">
          <h3>{hotel.name}</h3>
          <p>
            <span>{hotel.distance}</span> m far from center
          </p>

          <div className="desc">
            <strong> {hotel.desc} </strong>
          </div>
        </div>
        <div className="search__overall">
          <div className="rate">
            <div className="point"> {hotel.rating}/5⭐</div>
          </div>

          <div className="search__point_container">
            <p className="price">
              <strong>${hotel.cheapestPrice}</strong>
            </p>
            <p className="tax">Includes taxes and price</p>
            {user ? (
              <Link to={`/hotel/${hotel._id}`} className="btn">
                See availability
              </Link>
            ) : (
              <button
                onClick={() => toast.warning("Must login first")}
                className="btn"
              >
                See availability
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

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
  };

  return (
    <>
      {isShowDateInput ? (
        <DateRange
          style={{ screenLeft: "565px" }}
          editableDateInputs={true}
          onChange={(item) => selecDateHandler(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={dateInput}
        />
      ) : null}
      <section>
        <div className="search_container">
          <div className="search__form">
            <h3>Search</h3>
            <form onSubmit={submitSearchForm}>
              <div>
                <h4>Destination</h4>
                <input
                  type="text"
                  placeholder={
                    searchContext?.city
                      ? searchContext.city
                      : "Where are you going?"
                  }
                  onChange={(e) =>
                    setSearchContext((prevState) => ({
                      ...prevState,
                      city: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <h4>
                  Check-in Date <span> </span>
                  <i
                    onClick={() => setShowState((prevState) => !prevState)}
                    className="fa fa-calendar-alt btnCalender"
                  ></i>
                </h4>

                <input
                  type="text"
                  value={`${
                    searchContext.startDate === ""
                      ? "Click the icon"
                      : searchContext.startDate
                  } to ${
                    searchContext.endDate === ""
                      ? "pick date"
                      : searchContext.endDate
                  }`}
                  onChange={() => 1}
                />
              </div>
              <div className="options">
                <h4>Options</h4>
                <div>
                  <p>Min price per night</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Max price per night</p>
                  <input type="text" />
                </div>

                <div>
                  <p>Adult</p>
                  <input
                    type="text"
                    placeholder={
                      searchContext?.adult ? searchContext.adult : "1"
                    }
                    onChange={(e) =>
                      setSearchContext((prevState) => ({
                        ...prevState,
                        adult: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Children</p>
                  <input
                    type="text"
                    placeholder={
                      searchContext?.child ? searchContext.child : "1"
                    }
                    onChange={(e) =>
                      setSearchContext((prevState) => ({
                        ...prevState,
                        child: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Room</p>
                  <input
                    type="text"
                    placeholder={searchContext?.room ? searchContext.room : "1"}
                    onChange={(e) =>
                      setSearchContext((prevState) => ({
                        ...prevState,
                        room: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <button type="submit" className="btn search__form_btn">
                Search
              </button>
            </form>
          </div>
          <div className="search__list">
            {searchResult.length !== 0 ? (
              renderSearchList
            ) : (
              <h1>Can't find any hotel match your requirement</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
