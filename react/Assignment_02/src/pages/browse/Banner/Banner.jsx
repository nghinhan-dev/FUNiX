/* eslint-disable react/prop-types */
export default function Banner({ banner }) {
  return (
    <section
      id="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${banner?.backdrop_path})`,
      }}
    >
      <div className="container">
        <div className="banner_container">
          <h3>{banner?.name}</h3>
          <button className="btn">Play</button>
          <button className="btn">My List</button>
          <div className="overview">
            <p>{banner?.overview} </p>
          </div>
        </div>
      </div>
    </section>
  );
}
