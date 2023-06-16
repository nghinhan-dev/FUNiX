import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SearchForm from "./SearchForm/SearchForm";

export default function Search() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const [showPortal, setShowPortal] = useState({
    id: "",
    isShow: false,
  });
  const [portalData, setPortalData] = useState({
    data: {},
    video: {},
  });

  const getQuery = (str) => {
    setQ(encodeURIComponent(str));
  };

  // use for fecth Search results
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
          setResult([]);
          setErrorMsg(searchResult.status_message);
        }

        if (active) {
          if (searchResult.results.length === 0) {
            return setErrorMsg("Found no movie!");
          }

          setErrorMsg("");
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

  // use for fecth portal's data
  useEffect(() => {
    let active = true;
    const fetchVideoandScroll = async () => {
      try {
        const respond = await fetch(
          `https://api.themoviedb.org/3/movie/${showPortal?.id}/videos?api_key=a41e04665d0188e4b15ad25b23931766`
        );

        if (!respond.ok) {
          setPortalData((prevState) => ({
            ...prevState,
            video: [],
          }));
          throw new Error(`${showPortal?.id} is doomed`);
        }

        const vidData = await respond.json();

        if (active) {
          setPortalData((prevState) => ({
            ...prevState,
            video: vidData.results,
          }));
        }

        // Scroll to 300px down after fetching the data
        const list = document.getElementById("portal");
        list.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVideoandScroll();

    return () => {
      active = false;
    };
  }, [showPortal.id]);

  return (
    <section id="searchPage">
      <div className="container">
        <SearchForm getQuery={getQuery} />
        <div className="poster__container">
          {!errorMsg ? displaySearchResult(result) : <h1>{errorMsg}</h1>}
        </div>
        {showPortal.isShow &&
          createPortal(
            <div id="portal">
              <div className="portal__container">
                <div className="movie_desc">
                  <h3>
                    {portalData.data?.original_name ||
                      portalData.data?.original_title}
                  </h3>
                  <hr />
                  <p>Release Date: {portalData.data.release_date}</p>
                  <p>Vote: {portalData.data.vote_average}/10</p>
                  <p className="overview">{portalData.data.overview}</p>
                </div>
                <div className="movie_mv">
                  {portalData.video && renderPortalVideo()}
                </div>
              </div>
            </div>,
            document.getElementById("searchPage")
          )}
      </div>
    </section>
  );

  function displaySearchResult(list) {
    let content = list.map((movie) => {
      return (
        <div className="poster" key={movie.id}>
          <img
            onClick={() => displayPortal(movie, showPortal)}
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie.name + "jpg"}
            draggable={false}
          />
        </div>
      );
    });

    return content;
  }

  function displayPortal(movie, obj) {
    if (movie.id == obj.id && obj.isShow) {
      // click on the same image (same id) && portal is already show
      setShowPortal((prevState) => ({ ...prevState, isShow: false }));
    } else {
      setShowPortal((prevState) => ({
        ...prevState,
        id: movie.id,
        isShow: true,
      }));
      setPortalData((prevState) => ({
        ...prevState,
        data: movie,
      }));
    }
  }

  function renderPortalVideo() {
    let arrayVideo = portalData.video;
    if (arrayVideo == []) {
      return (
        <img
          className="portal__img"
          src={`https://image.tmdb.org/t/p/w500${portalData.data.backdrop_path}`}
          alt={portalData.data.name + "jpg"}
          draggable={false}
        />
      );
    }

    let findTrailerIndex = arrayVideo.findIndex(
      (vid) => vid.type === "Trailer"
    );

    if (findTrailerIndex != -1) {
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${arrayVideo[findTrailerIndex].key}`}
        ></iframe>
      );
    } else {
      let findTeaserIndex = arrayVideo.findIndex(
        (vid) => vid.type === "Teaser"
      );

      if (findTeaserIndex != -1) {
        return (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${arrayVideo[findTrailerIndex].key}`}
          ></iframe>
        );
      } else {
        return (
          <img
            className="portal__img"
            src={`https://image.tmdb.org/t/p/w500${portalData.data.backdrop_path}`}
            alt={portalData.data.name + "jpg"}
            draggable={false}
          />
        );
      }
    }
  }
}
