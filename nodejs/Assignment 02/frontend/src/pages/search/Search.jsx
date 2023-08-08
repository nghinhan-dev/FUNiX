import searchData from "/data/search.json";

export default function Search() {
  let renderSearchList = searchData.map((hotel) => {
    return (
      <div className="search__item" key={hotel.name + "id"}>
        <div className="search__img">
          <img src={`${hotel.image_url}`} alt={`${hotel.name}`} />
        </div>
        <div className="search__desc">
          <h3>{hotel.name}</h3>
          <p>{hotel.distance} far from center</p>
          <p className="tag"> {hotel.tag} </p>
          <p>
            <strong> {hotel.description} </strong>
          </p>
          <p>{hotel.type}</p>
          {hotel.free_cancel ? (
            <>
              <p className="cancel">
                <strong>Free cancellation</strong>
              </p>
              <p className="cancel">
                You can cancel later, so lock in this great price today!
              </p>
            </>
          ) : null}
        </div>
        <div className="search__overall">
          <div className="rate">
            <strong> {hotel.rate_text} </strong>
            <div className="point"> {hotel.rate} </div>
          </div>

          <div className="search__point_container">
            <p className="price">
              <strong>${hotel.price}</strong>
            </p>
            <p className="tax">Includes taxes and price</p>
            <button className="btn">See availability</button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="search_container">
        <div className="search__form">
          <h3>Search</h3>
          <div>
            <h4>Destination</h4>
            <input type="text" placeholder="Where are you going?" />
          </div>
          <div>
            <h4>Check-in Date</h4>
            <input type="text" placeholder="16/04/2023 to 16/04/2023" />
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
              <input type="text" placeholder="1" />
            </div>

            <div>
              <p>Children</p>
              <input type="text" placeholder="0" />
            </div>

            <div>
              <p>Room</p>
              <input type="text" placeholder="1" />
            </div>
          </div>
        </div>
        <div className="search__list">{renderSearchList}</div>
      </div>
      <section> {/* intended */}</section>
    </>
  );
}
