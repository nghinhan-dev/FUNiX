const fs = require("fs");
const path = require("path");

// path
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

const VIDEO_LIST_PATH = path.join(
  path.dirname(mainModulePath),
  "data",
  "videoList.json"
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
          total_pages: Math.ceil(trendingList.length / 20) + 1,
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
          total_pages: Math.ceil(trendingList.length / 20) + 1,
        });
      }
    });
  }

  static async discover(callback, genreID, page) {
    try {
      if (genreID === 1) {
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
              total_pages: Math.ceil(movieList.length / 20) + 1,
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
      callback({ message: error.message });
    }
  }

  static getTrailer(callback, movieID) {
    try {
      if (+movieID === 1) {
        throw new Error("Not found film_id param error");
      }

      fs.readFile(VIDEO_LIST_PATH, (err, fileContent) => {
        if (err) {
          callback([]);
        } else {
          try {
            const videoData = JSON.parse(fileContent);

            const movieIndex = videoData.findIndex(
              (item) => item.id === +movieID
            );

            if (movieIndex === -1) {
              throw new Error("Cannot find film_id movie");
            } else {
              const videos = videoData[movieIndex].videos;
              const result = videos
                .filter((item) => item.official === true)
                .filter((item) => item.site === "YouTube")
                .filter(
                  (item) => item.type === "Trailer" || item.type === "Teaser"
                );

              if (result.length === 0) {
                // Respond with status 404 if result is empty
                throw new Error("Trailer not found");
              } else {
                result.sort(
                  (a, b) => new Date(b.published_at) - new Date(a.published_at)
                );

                const latestItem = result[0];
                callback(latestItem);
              }
            }
          } catch (error) {
            callback({ message: error.message });
          }
        }
      });
    } catch (error) {
      callback({ message: error.message });
    }
  }

  static search(callback, query, page) {
    const q = query.toLowerCase();
    try {
      if (q === "") {
        throw new Error("Not found keyword parram");
      }

      fs.readFile(MOVIE_LIST_PATH, (err, fileContent) => {
        if (err) {
          callback([]);
        } else {
          const movieData = JSON.parse(fileContent);

          const searchResults = movieData.filter((movie) => {
            const overviewSearch = movie.overview.toLowerCase();
            const titleSearch = movie?.title?.toLowerCase();

            return overviewSearch.includes(q) || titleSearch?.includes(q);
          });

          console.log("searchResults:", searchResults.length);
          // callback(searchResults);

          callback({
            result: searchResults.splice(page.start, page.end),
            page: +page.currentPage,
            total_pages: Math.ceil(searchResults.length / 20) + 1,
          });
        }
      });
    } catch (error) {
      callback({ message: error.message });
    }
  }
};
