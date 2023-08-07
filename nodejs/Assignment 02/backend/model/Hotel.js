const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: String,
  type: [String],
  city: String,
  address: String,
  distance: Number,
  photos: [String],
  desc: String,
  rating: Number,
  featured: String,
  rooms: [ObjectId],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
