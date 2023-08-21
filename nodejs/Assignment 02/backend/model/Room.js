const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookedRangeSchema = new Schema({
  startDate: Date,
  endDate: Date,
});

const roomSchema = new Schema({
  number: Number,
  bookedRange: [bookedRangeSchema],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
