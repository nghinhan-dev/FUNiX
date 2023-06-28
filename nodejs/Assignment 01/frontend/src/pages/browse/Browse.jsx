import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
import { useLoaderData } from "react-router-dom";

function Browse() {
  const movies = useLoaderData();

  const banner = movies?.fetchNetflixOriginals[Math.floor(Math.random() * 20)];

  return (
    <>
      <Banner key={"8DJF0" + "banner"} banner={banner} />
      <MovieList key={"d9a0-4624-be4d"} data={movies} />
    </>
  );
}

export default Browse;
