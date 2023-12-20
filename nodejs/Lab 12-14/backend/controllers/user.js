const { getDB } = require("../util/database");
const User = require("../model/user");
const brcypt = require("bcrypt");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const db = getDB();

  try {
    const user = await db.collection("users").findOne({ userName: userName });

    if (!user) {
      throw new Error("Cannot find user");
    }

    const isMatch = await brcypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password!");
    }

    req.session.isLogined = true;
    req.session.userID = user._id;
    req.session.save();

    res.status(200).send({ statusText: "Succesfully login" });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ statusText: error.message });
  }
};

exports.signUp = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;
  const db = getDB();

  try {
    const isExisted = await db
      .collection("users")
      .findOne({ username: username });

    console.log("isExisted:", isExisted);

    if (isExisted) {
      throw new Error("Existed account!");
    }

    if (password !== confirmPassword) {
      throw new Error("Unmatched confirm password!");
    }

    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);

    const user = new User(username, hashedPassword, email, { items: [] });

    await user.save();

    return res.status(200).send({ statusText: "Create sucessfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ statusText: error.message });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();

  res.status(200).send("Logout");
};
