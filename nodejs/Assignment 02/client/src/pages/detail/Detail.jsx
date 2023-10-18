import { Link, useLoaderData } from "react-router-dom";

export default function Detail() {
  const [hotelData] = useLoaderData();

  return (
    <section id="detail" style={{ marginTop: "5px" }}>
      <div className="container">
        <div className="address__info">
          <div className="address">
            <h2>{hotelData.name}</h2>
            <p>
              <i className="fa fa-map-marker-alt"></i>
              {hotelData.address}
            </p>
          </div>

          <Link to={`/book/${hotelData._id}`} className="btn">
            Reserve a Book Now!
          </Link>
        </div>

        <p className="locate">
          Excellent location - {hotelData.distance}m from center
        </p>
        <p className="price">
          Book a stay over ${hotelData.cheapestPrice} at this property and get a
          free airport taxi
        </p>

        <div className="img__layout">
          {hotelData.photos.map((photo, index) => (
            <img key={index + "photo"} src={`${photo}`} />
          ))}
        </div>

        <div className="description">
          <div className="content">
            <h1>{hotelData.title}</h1>
            <p>{hotelData.desc}</p>
          </div>

          <div className="payment">
            <h3>
              <strong>${hotelData.cheapestPrice}</strong> (1 night)
            </h3>

            <Link to={`/book/${hotelData._id}`} className="btn">
              Reserve a Book Now!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
