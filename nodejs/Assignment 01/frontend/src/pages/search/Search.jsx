import { useEffect, useState } from "react";
import YouTube from "react-youtube";
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
    destinate: "",
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
          `http://localhost:3000/movies/search/?token=8qlOkxz4wq&query=${q}`,
          {
            method: "POST",
          }
        );

        const searchResult = await respond.json();

        if (!respond.ok) {
          setResult([]);
          setErrorMsg(searchResult.message);
        }

        if (active) {
          if (searchResult.result.length === 0) {
            return setErrorMsg("Found no movie!");
          }

          setErrorMsg("");
          setResult(searchResult.result);
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
    const fetchVideo = async () => {
      try {
        const respond = await fetch(
          `http://localhost:3000/movies/trailer/?token=8qlOkxz4wq&id=${showPortal.id}`,
          {
            method: "POST",
          }
        );

        if (!respond.ok) {
          setPortalData((prevState) => ({
            ...prevState,
            video: { message: "Not found" },
          }));
          throw new Error(`${showPortal?.id} is doomed`);
        }

        const vidData = await respond.json();

        setPortalData((prevState) => ({
          ...prevState,
          video: vidData,
        }));
      } catch (error) {
        showPortal.id !== "" && console.log(error.message);
      }
    };

    showPortal.id !== "" && fetchVideo();
  }, [showPortal.id]);

  return (
    <section id="searchPage">
      <div className="container">
        <SearchForm getQuery={getQuery} />
        <div className="poster__container">
          {!errorMsg ? (
            displaySearchResult(result)
          ) : (
            <h1 style={{ color: "#FFCC00" }}>{errorMsg}</h1>
          )}
        </div>
        {showPortal.isShow &&
          !errorMsg &&
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
    let vid = portalData.video;

    if (vid?.message) {
      return (
        <img
          className="portal__img"
          src={`https://image.tmdb.org/t/p/w500${portalData.data.backdrop_path}`}
          alt={portalData.data.name + "jpg"}
          draggable={false}
        />
      );
    } else {
      return (
        <YouTube
          videoId={`${vid.key}`}
          style={{
            width: "100%",
          }}
          onError={() => {
            setPortalData((prevState) => ({
              ...prevState,
              video: { message: "Not found" },
            }));
          }}
        />
      );
    }
  }
}
