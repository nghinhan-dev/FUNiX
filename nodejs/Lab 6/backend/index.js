const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/add-song", (req, res, next) => {
  res.send({ songTitle: req.body.songTitle });

  console.log(req.body.songTitle);
});

app.get("/", (req, res, next) => {
  res.render("index");
});

app.listen(3000, () => console.log("listen to  art on http://localhost:3000/"));
