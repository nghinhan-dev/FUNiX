import { useEffect, useState } from "react";
import { getData } from "../../service/moiveAPI";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";

function Browse() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setMovieData(data);
    };

    fetchData();
  }, []);

  const banner =
    movieData?.fetchNetflixOriginals[Math.floor(Math.random() * 20)];

  return (
    <>
      <Banner key={"8DJF0" + "banner"} banner={banner} />
      <MovieList key={"d9a0-4624-be4d"} data={movieData} />
    </>
  );
}

export default Browse;
