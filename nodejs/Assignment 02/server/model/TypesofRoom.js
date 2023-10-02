const mongoose = require("mongoose");
const { Schema } = mongoose;

const typesofRoomSchema = new Schema({
  title: String,
  price: {
    type: Number,
    default: 0,
  },
  maxPeople: {
    type: Number,
    default: 0,
  },
  desc: {
    type: String,
    default: "",
  },
  roomIds: [String],
});

const TypeofRoom = mongoose.model("TypeofRoom", typesofRoomSchema);

module.exports = TypeofRoom;
