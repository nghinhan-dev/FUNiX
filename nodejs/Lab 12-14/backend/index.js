const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./util/database");

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const detailRoutes = require("./routes/detail");
const userRoutes = require("./routes/user");

const app = express();

// config
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// route use
app.use(adminRoutes);
app.use(shopRoutes);
app.use(detailRoutes);
app.use(userRoutes);

connectToDB()
  .then(() => {
    app.listen(3000, () => console.log("Rocking on 3000!!"));
  })
  .catch((err) => console.log(err));
