import { useEffect, useState } from "react";
import { getRespond } from "../../../service/moiveAPI";

export default function Banner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const respond = await getRespond("fetchNetflixOriginals");
      const rawData = await respond.json();
      console.log("rawData:", rawData);
      const newData = rawData.results[Math.floor(Math.random() * 20 - 1)];

      if (active) {
        console.log(newData);
        setBanner(newData);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

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
          <p>{banner?.overview} </p>
        </div>
      </div>
    </section>
  );
}
