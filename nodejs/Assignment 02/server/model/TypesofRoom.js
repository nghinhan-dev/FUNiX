const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const typesofRoomSchema = new Schema({
  title: String,
  price: Number,
  maxPeople: Number,
  desc: String,
  rooms: [ObjectId],
});

const TypeofRoom = mongoose.model("TypeofRoom", typesofRoomSchema);

module.exports = TypeofRoom;