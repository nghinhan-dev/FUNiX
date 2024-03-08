const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [Object],
  total: Number,
  user: String,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
