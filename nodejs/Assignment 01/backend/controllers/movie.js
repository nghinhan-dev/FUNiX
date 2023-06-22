const Movies = require("../models/Movies");
const pagination = require("../util/paging");

exports.getAllMovies = (req, res, next) => {
  Movies.getAll((movieslist) => res.send(movieslist));
};

exports.getTrendingMovies = (req, res, next) => {
  const currentPage = req.query.page || 1;

  Movies.getTrending((list) => {
    res.status(200).send(list);
  }, pagination(currentPage));
};

exports.getTopRatedMovies = (req, res, next) => {
  const currentPage = req.query.page || 1;

  Movies.getTopRated((list) => {
    res.status(200).send(list);
  }, pagination(currentPage));
};

exports.discover = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const genreID = req.query.genre || -1;

  Movies.discover(
    (list) => {
      if (list?.message) {
        res.status(400).send(list);
      } else {
        res.status(200).send(list);
      }
    },
    genreID,
    pagination(currentPage)
  );
};

exports.getTrailerData = (req, res, next) => {
  const movieId = req.query.id;

  Movies.getTrailer((list) => {
    if (list?.message === "Not found film_id param error") {
      res.status(400).send(list);
    } else if (list?.message === "Cannot find film_id movie") {
      res.status(404).send(list);
    } else {
      res.status(200).send(list);
    }
  }, movieId);
};

exports.search = (req, res, next) => {
  const query = req.query.query;

  Movies.search(
    (list) => {
      if (list?.message === "Not found keyword parram") {
        res.status(400).send(list);
      } else if (list?.message) {
        res.status(404).send(list);
      } else {
        res.status(200).send(list);
      }
    },
    query,
    pagination(1)
  );
};
