const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: String,
  hotel: ObjectId,
  room: [ObjectId],
  dateStart: Date,
  dateEnd: Date,
  price: Number,
  payment: String,
  status: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
