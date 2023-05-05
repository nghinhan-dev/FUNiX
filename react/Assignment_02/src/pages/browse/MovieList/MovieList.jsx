/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MovieList({ data }) {
  const [showPortal, setShowPortal] = useState({
    id: "",
    isShow: false,
  });
  const [portalData, setPortalData] = useState({
    destinate: "",
    data: {},
    video: {},
  });

  useEffect(() => {
    let active = true;
    const fetchVideo = async () => {
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
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVideo();

    return () => {
      active = false;
    };
  }, [showPortal.id]);

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

  function renderMovieList(list, isPoster) {
    let content = list.map((movie) => {
      return (
        <SwiperSlide className={isPoster ? "poster" : null} key={movie.id}>
          {!isPoster ? (
            <img
              onClick={() => displayPortal(movie, showPortal)}
              className="cate__img"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.name + "jpg"}
              draggable={false}
            />
          ) : (
            <img
              onClick={() => displayPortal(movie, showPortal)}
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie.name + "jpg"}
              draggable={false}
            />
          )}
        </SwiperSlide>
      );
    });

    return content;
  }

  function renderCategoryList(obj) {
    return Object.keys(obj).map((keyName) => {
      let title = keyName.includes("Movies")
        ? keyName.replace("fetch", "").replace("Movies", "")
        : keyName.replace("fetch", "");
      // Remove unused character to use for title of category section

      if (keyName == "fetchNetflixOriginals") {
        return (
          <div id={keyName} key={title} className="poster__container container">
            <Swiper
              onClick={() =>
                setPortalData((prevState) => ({
                  ...prevState,
                  destinate: keyName,
                }))
              }
              spaceBetween={15}
              slidesPerView={8}
              loop={true}
            >
              {renderMovieList(obj[keyName], true)}
            </Swiper>
          </div>
        );
      }
      return (
        <div id={keyName} key={title} className="cate__item container">
          <h3 className="cate__title">{title}</h3>
          <Swiper
            onClick={() =>
              setPortalData((prevState) => ({
                ...prevState,
                destinate: keyName,
              }))
            }
            key={keyName}
            spaceBetween={17}
            slidesPerView={5}
            loop={true}
          >
            {renderMovieList(obj[keyName], false)}
          </Swiper>
        </div>
      );
    });
  }

  return (
    <>
      {data && renderCategoryList(data)}

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
          document.getElementById(portalData.destinate)
        )}
    </>
  );
}
