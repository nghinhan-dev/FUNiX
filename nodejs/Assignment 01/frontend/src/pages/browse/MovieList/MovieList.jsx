/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import YouTube from "react-youtube";

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
              <div className="movie_mv">{renderPortalVideo()}</div>
            </div>
          </div>,
          document.getElementById(portalData.destinate)
        )}
    </>
  );

  function renderCategoryList(obj) {
    return Object.keys(obj).map((keyName) => {
      let title = keyName.includes("Movies")
        ? keyName.replace("fetch", "").replace("Movies", "")
        : keyName.replace("fetch", "");

      return (
        <div
          id={keyName}
          key={title}
          className={`${
            keyName === "fetchNetflixOriginals"
              ? "poster__container"
              : "cate__item"
          } container`}
        >
          {!(keyName === "fetchNetflixOriginals") && (
            <h3 className="cate__title">{title}</h3>
          )}
          <Swiper
            onClick={() =>
              setPortalData((prevState) => ({
                ...prevState,
                destinate: keyName,
              }))
            }
            key={keyName}
            spaceBetween={keyName === "fetchNetflixOriginals" ? 15 : 17}
            slidesPerView={keyName === "fetchNetflixOriginals" ? 8 : 5}
            loop={true}
          >
            {renderMovieList(obj[keyName], keyName === "fetchNetflixOriginals")}
          </Swiper>
        </div>
      );
    });
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
