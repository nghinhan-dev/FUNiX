const fs = require("fs");
const path = require("path");

// path
const mainModulePath = require.main.filename;
const TOKEN_LIST_PATH = path.join(
  path.dirname(mainModulePath),
  "data",
  "userToken.json"
);

const authUser = (req, res, next) => {
  const reqToken = req.query.token;

  fs.readFile(TOKEN_LIST_PATH, (err, fileContent) => {
    if (err) {
      res.status(422).send({ message: "Unprocessable Content" });
    } else {
      const userToken = JSON.parse(fileContent);
      const reqUserIndex = userToken.findIndex(
        (user) => user.token === reqToken
      );

      if (reqUserIndex !== -1) {
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  });
};

module.exports = authUser;
