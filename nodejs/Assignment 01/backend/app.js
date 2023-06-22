const express = require("express");
const app = express();

const bodyParse = require("body-parser");
const cors = require("cors");

// config
app.use(bodyParse.json());
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// routes
const movieRoutes = require("./routes/movie");

app.use("/movies", movieRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "Page not found on" });
});

app.use("/", (req, res, next) => {
  res.status(200).send({ message: "Hello World!" });
});

app.listen(3000);
