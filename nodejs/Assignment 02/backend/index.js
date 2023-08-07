const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongooseRun } = require("./util/mongoDB");
const User = require("./model/User");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

mongooseRun()
  .then(() => {
    app.listen(5000, () => console.log("Rocking on 5000!"));
  })
  .catch((err) => console.log(err));
