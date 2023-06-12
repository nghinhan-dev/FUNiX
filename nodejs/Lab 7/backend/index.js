const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// config
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.send("Heiyo");
});

app.listen(3000, () => console.log("Lab 7 on http://localhost:3000/"));
