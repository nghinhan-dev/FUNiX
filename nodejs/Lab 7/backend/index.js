const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Book = require("./model/books");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/cart-item");

const app = express();

// config
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const detailRoutes = require("./routes/detail");

// middleware
app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(2);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(detailRoutes);

app.use("/", (req, res, next) => {
  res.send({ text: "Heiyo" });
});

// Associations
Book.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Book);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Book, { through: CartItem });
Book.belongsToMany(Cart, { through: CartItem });

try {
  (async () => {
    await sequelize.sync();
    const user = await User.findByPk(2);
    if (!user) {
      await User.create({ name: "Kim Hoang", email: "emhoangcute@sw.com" });
    }

    const cart = await user.getCart();
    if (!cart) {
      // Create a cart for the user only if they don't have one
      await user.createCart();
    }

    app.listen(3000, () => console.log("Lab 7 on http://localhost:3000/"));
  })();
} catch (err) {
  console.log(err);
}
