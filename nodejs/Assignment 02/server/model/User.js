const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  fullName: String,
  phoneNumber: Number,
  email: String,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
