export default function Carousel({ city, byProperty, highestRatingResult }) {
  const renderCity = () => {
    const cityItems = []; // Create an array to store city items

    for (const [key, value] of Object.entries(city)) {
      cityItems.push(
        <div className="city__item item" key={key + `city`}>
          <img src={`/City%20Image/${key}.jpg`} alt={key} />
          <h2>{key.replace(/([a-z])([A-Z])/g, "$1 $2")}</h2>
          <p>{value} properties</p>
        </div>
      );
    }

    return cityItems; // Return the array of city items
  };

  const renderByProperty = () => {
    const byPropertyItems = []; // Create an array to store city items

    for (const [key, value] of Object.entries(byProperty)) {
      byPropertyItems.push(
        <div className="type__item" key={key + `type`}>
          <div className="type__img item">
            <img
              src={`/City%20Image/type_${byPropertyItems.length + 1}.jpg`}
              alt={key}
            />
          </div>
          <h2>{key.toLocaleUpperCase()}</h2>
          <p>
            {value} {key}
          </p>
        </div>
      );
    }

    return byPropertyItems;
  };

  let renderTopHotel = highestRatingResult.map((item) => {
    return (
      <div className="hotel__item" key={item._id}>
        <div className="hotel__img item">
          <img src={`${item.photos[0]}`} alt={item.name} />
        </div>
        <a href="#carousel">
          <p>{item.name}</p>
        </a>
        <p>{item.city}</p>
        <p>
          <strong>Starting from ${item.cheapestPrice}</strong>
        </p>
      </div>
    );
  });

  return (
    <section id="carousel">
      <div className="container">
        {/* Render City List */}
        <div className="city__carousel">{renderCity()}</div>

        {/* Render Type List */}
        <div className="type__carousel">
          <h2>Browse by property type</h2>
          <div className="type__container">{renderByProperty()}</div>
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
