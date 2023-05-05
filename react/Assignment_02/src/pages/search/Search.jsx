import { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";

export default function Search() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const getQuery = (str) => {
    setQ(encodeURIComponent(str));
  };

  useEffect(() => {
    let active = true;
    const fetchVideo = async () => {
      try {
        // a41e04665d0188e4b15ad25b23931766
        const respond = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=a41e04665d0188e4b15ad25b23931766&language=en-US&query=${q}&page=1&include_adult=false`
        );

        const searchResult = await respond.json();

        if (!respond.ok) {
          setErrorMsg(searchResult.status_message);
        }

        if (active) {
          setResult(searchResult.results);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (q !== "") fetchVideo();

    return () => {
      active = false;
    };
  }, [q]);

  function displaySearchResult(list) {
    let content = list.map((movie) => {
      return (
        <div className="poster" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie.name + "jpg"}
            draggable={false}
          />
        </div>
      );
    });

    return content;
  }

  return (
    <>
      <SearchForm getQuery={getQuery} />
      <div className="poster__container">
        {!errorMsg ? displaySearchResult(result) : <h1>{errorMsg}</h1>}
      </div>
    </>
  );
}
