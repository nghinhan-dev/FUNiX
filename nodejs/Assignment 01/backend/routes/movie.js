const express = require("express");
const router = express.Router();

// controllers
const movieController = require("../controllers/movie");

router.get("/all", movieController.getAllMovies);
router.get("/trending", movieController.getTrendingMovies);
router.get("/top-rate", movieController.getTopRatedMovies);
router.get("/discover", movieController.discover);

module.exports = router;
