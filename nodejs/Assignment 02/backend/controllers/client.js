const User = require("../model/User");

exports.loginUser = async (req, res, next) => {
  try {
    const users = await User.find({
      username: req.body.username,
      password: req.body.password,
    }).exec();

    if (users.length === 0) {
      throw new Error("Cannot find account");
    }

    res.status(200).send(users[0]);
  } catch (error) {
    console.log("error:", error);
    res.status(404).send(`${error}`);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const users = await User.find({
      username: req.body.username,
    });

    console.log("users:", users);
    if (users.length !== 0) {
      throw new Error("Account already existed!");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: `${req.body.username}@gmail.com`,
    });

    await newUser.save();

    res.status(200).send("Successfully created!");
  } catch (error) {
    console.log("error:", error);
    res.status(409).send(`${error}`);
  }
};
