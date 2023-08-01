const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./util/database");
const User = require("./model/user");

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

// middleware
app.use(async (req, res, next) => {
  try {
    const user = await User.findById("64c875b743dedac9b541f766");
    req.user = new User(user.userName, user.email, user._id, user.cart);
    next();
  } catch (error) {
    console.log("error:", error);
  }
});

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
