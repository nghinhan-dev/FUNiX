const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000, () => console.log("Lab 7 on http://localhost:3000/"));
