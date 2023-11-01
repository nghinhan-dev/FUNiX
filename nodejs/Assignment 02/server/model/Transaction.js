const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: String,
  hotel: String,
  roomIds: [String],
  dateStart: Date,
  dateEnd: Date,
  total: Number,
  payment: String,
  status: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
