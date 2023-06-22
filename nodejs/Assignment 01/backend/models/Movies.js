const fs = require("fs");
const path = require("path");

const mainModulePath = require.main.filename;
const p = path.join(path.dirname(mainModulePath), "data", "movieList.json");

module.exports = class Movies {
  static getAll(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }

  static getTrending(callback, page) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        const trendingList = JSON.parse(fileContent).sort(
          (a, b) => b.popularity - a.popularity
        );

        const start = (page - 1) * 20;
        const end = start + 20;

        callback({
          result: trendingList.splice(start, end),
          page,
          total_pages: Math.ceil(trendingList.length / 20),
        });
      }
    });
  }

  static getTopRated(callback, page) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        const trendingList = JSON.parse(fileContent).sort(
          (a, b) => b.vote_average - a.vote_average
        );

        const start = (page - 1) * 20;
        const end = start + 20;

        callback({
          result: trendingList.splice(start, end),
          page,
          total_pages: Math.ceil(trendingList.length / 20),
        });
      }
    });
  }
};
