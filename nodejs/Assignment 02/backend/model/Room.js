const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: String,
  price: Number,
  maxPeople: Number,
  desc: String,
  roomNumbers: [Number],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
