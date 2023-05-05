import detailData from "/data/detail.json";

export default function Detail() {
  return (
    <>
      <section id="detail">
        <div className="container">
          <div className="address__info">
            <div className="address">
              <h2>{detailData.name}</h2>
              <p>
                <i className="fa fa-map-marker-alt"></i>
                {detailData.name}
              </p>
            </div>

            <button className="btn">Reserve a Book Now!</button>
          </div>

          <p className="locate">{detailData.distance}</p>
          <p className="price">{detailData.price}</p>

          <div className="img__layout">
            {detailData.photos.map((photo, index) => (
              <img key={index + "photo"} src={`${photo}`} />
            ))}
          </div>

          <div className="description">
            <div className="content">
              <h1>{detailData.title}</h1>
              <p>{detailData.description}</p>
            </div>

            <div className="payment">
              <h4>Perfect for a 9-night stay!</h4>
              <p>
                Located in the real heart of Krakwo, this property has an
                excellent location score of 9.8!
              </p>

              <h3>
                <strong>$945</strong> (9 nights)
              </h3>

              <button className="btn">Reserve a Book Now!</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
