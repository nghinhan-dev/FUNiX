const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./util/database");

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const detailRoutes = require("./routes/detail");

const app = express();

// config
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// route use
app.use(adminRoutes);
app.use(shopRoutes);
app.use(detailRoutes);

app.use("/", (req, res, next) => {
  res.send({ text: "Heiyo" });
});

connectToDB()
  .then(() => {
    app.listen(3000, () => console.log("Rocking on 3000!!"));
  })
  .catch((err) => console.log(err));
