const Movies = require("../models/Movies");

exports.getAllMovies = (req, res, next) => {
  Movies.getAll((movieslist) => res.send(movieslist));
};

exports.getTrendingMovies = (req, res, next) => {
  const currentPage = req.query.page || 1;

  Movies.getTrending((list) => {
    res.status(200).send(list);
  }, currentPage);
};

exports.getTopRatedMovies = (req, res, next) => {
  const currentPage = req.query.page || 1;

  Movies.getTopRated((list) => {
    res.status(200).send(list);
  }, currentPage);
};
