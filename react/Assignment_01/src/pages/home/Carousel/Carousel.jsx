import cityData from "/data/city.json";
import typeData from "/data/type.json";
import hotelData from "/data/hotel_list.json";

export default function Carousel() {
  let renderCity = cityData.map((item) => {
    return (
      <div className="city__item item" key={item.name + `city`}>
        <img src={`${item.image}`} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.subText}</p>
      </div>
    );
  });

  let renderTypeBrowser = typeData.map((item) => {
    return (
      <div className="type__item" key={item.name + `type`}>
        <div className="type__img item">
          <img src={`${item.image}`} alt={item.name} />
        </div>
        <h2>{item.name}</h2>
        <p>{item.count} Hotel</p>
      </div>
    );
  });

  let renderTopHotel = hotelData.map((item) => {
    return (
      <div className="hotel__item" key={item.name + `hotel`}>
        <div className="hotel__img item">
          <img src={`${item.image_url}`} alt={item.name} />
        </div>
        <a href="#carousel">
          <p>{item.name}</p>
        </a>
        <p>{item.city}</p>
        <p>
          <strong>Starting from ${item.price}</strong>
        </p>
        <p>
          <span className="point">{item.rate}</span>
          <span>{item.type}</span>
        </p>
      </div>
    );
  });

  return (
    <section id="carousel">
      <div className="container">
        {/* Render City List */}
        <div className="city__carousel">{renderCity}</div>

        {/* Render Type List */}
        <div className="type__carousel">
          <h2>Browse by property type</h2>
          <div className="type__container">{renderTypeBrowser}</div>
        </div>

        {/* Render Hotel List */}
        <div className="hotel__carousel">
          <h2>Homes guess love</h2>
          <div className="hotel__container">{renderTopHotel}</div>
        </div>
      </div>
    </section>
  );
}
