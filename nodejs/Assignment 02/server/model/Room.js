const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookedRangeSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

const roomSchema = new Schema({
  number: { type: Number, default: 0 }, // Adding default value 0
  bookedRange: [bookedRangeSchema],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
