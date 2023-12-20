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

  // You can also return the updated cart if needed
  return cart;
};

userSchema.methods.getOrder = async function getOrder() {};

const User = mongoose.model("User", userSchema);
module.exports = User;
