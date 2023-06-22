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
      res.status(200).send(list);
    },
    genreID,
    pagination(currentPage)
  );
};
