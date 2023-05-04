/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function MovieList({ data }) {
  const [showPortal, setShowPortal] = useState({
    id: "",
    isShow: false,
  });
  const [portalData, setPortalData] = useState({
    destinate: "",
    data: {},
  });

  function displayPortal(newId, obj) {
    newId == obj.id && obj.isShow
      ? // click on the same image (same id) && portal is already show
        setShowPortal((prevState) => ({ ...prevState, isShow: false }))
      : setShowPortal((prevState) => ({
          ...prevState,
          id: newId,
          isShow: true,
        }));
  }

  function renderMovieList(list, isPoster) {
    let content = list.map((movie) => {
      return (
        <SwiperSlide className={isPoster ? "poster" : null} key={movie.id}>
          {!isPoster ? (
            <img
              onClick={() => displayPortal(movie.id, showPortal)}
              className="cate__img"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.name + "jpg"}
              draggable={false}
            />
          ) : (
            <img
              onClick={() => displayPortal(movie.id, showPortal)}
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
          <div id="portal">hello nigga</div>,
          document.getElementById(portalData.destinate)
        )}
    </>
  );
}
