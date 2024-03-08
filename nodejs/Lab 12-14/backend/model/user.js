const { getDB } = require("../util/database");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cartItemSchema = new mongoose.Schema(
  {
    id: String,
    quantity: {
      default: 1,
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  cart: {
    items: [cartItemSchema],
  },
});

// METHODS
userSchema.methods.addToCart = async function addToCart(product) {
  const cart = [...this.cart.items];
  const itemIndex = cart.findIndex((item) => {
    return item.id === product._id.toString();
  });

  if (itemIndex !== -1) {
    cart[itemIndex].quantity++;
  } else {
    cart.push({
      id: new ObjectId(product._id),
    });
  }

  this.cart.items = cart;
  await this.save();

  return cart;
};

userSchema.methods.getOrder = async function getOrder() {
  const db = getDB();

  return db
    .collection("orders")
    .find({ "user._id": new ObjectId(this._id) })
    .toArray();
};

userSchema.methods.delFromCart = async function delFromCart(itemID) {
  const cart = this.cart;

  const itemIndex = cart.items.findIndex((item) => {
    return item.id === itemID;
  });

  cart.items.splice(itemIndex);

  // this.cart.items = cart;
  await this.save();

  return;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
