const fs = require("fs");
const path = require("path");

const mainModulePath = require.main.filename;
const MOVIE_LIST_PATH = path.join(
  path.dirname(mainModulePath),
  "data",
  "movieList.json"
);
const GENRE_LIST_PATH = path.join(
  path.dirname(mainModulePath),
  "data",
  "genreList.json"
);

module.exports = class Movies {
  static getAll(callback) {
    fs.readFile(MOVIE_LIST_PATH, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }

  static getTrending(callback, page) {
    fs.readFile(MOVIE_LIST_PATH, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        const trendingList = JSON.parse(fileContent).sort(
          (a, b) => b.popularity - a.popularity
        );

        callback({
          result: trendingList.splice(page.start, page.end),
          page: +page.currentPage,
          total_pages: Math.ceil(trendingList.length / 20),
        });
      }
    });
  }

  static getTopRated(callback, page) {
    fs.readFile(MOVIE_LIST_PATH, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        const trendingList = JSON.parse(fileContent).sort(
          (a, b) => b.vote_average - a.vote_average
        );

        callback({
          result: trendingList.splice(page.start, page.end),
          page: +page.currentPage,
          total_pages: Math.ceil(trendingList.length / 20),
        });
      }
    });
  }

  static async discover(callback, genreID, page) {
    try {
      if (genreID === -1) {
        throw new Error("Not found genre parram");
      }

      const genreListPromise = new Promise((resolve, reject) => {
        fs.readFile(GENRE_LIST_PATH, (err, fileContent) => {
          if (err) {
            reject(err);
          } else {
            const genreList = JSON.parse(fileContent);
            const validGenre = genreList.findIndex(
              (genre) => genre.id === +genreID
            );

            if (validGenre === -1) {
              console.log("unknow id");
              reject(new Error("Not found that genre id"));
            } else {
              resolve(genreList);
            }
          }
        });
      });

      const movieListPromise = new Promise((resolve, reject) => {
        fs.readFile(MOVIE_LIST_PATH, (err, fileContent) => {
          if (err) {
            reject(err);
          } else {
            const movieList = JSON.parse(fileContent).filter((movie) =>
              movie.genre_ids.includes(+genreID)
            );

            const result = {
              result: movieList.slice(page.start, page.end),
              page: +page.currentPage,
              total_pages: Math.ceil(movieList.length / 20),
            };

            resolve(result);
          }
        });
      });

      const [genreList, movieList] = await Promise.all([
        genreListPromise,
        movieListPromise,
      ]);

      callback(movieList);
    } catch (error) {
      console.log("error:", error);
      callback([]);
    }
  }
};
