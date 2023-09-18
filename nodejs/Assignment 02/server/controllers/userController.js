const User = require("../model/User");

exports.loginUser = async (req, res) => {
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

exports.clientCreateUser = async (req, res) => {
  try {
    const users = await User.find({
      username: req.body.username,
    });

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

exports.adminCreateUser = async (req, res) => {
  try {
    const users = await User.find({
      username: req.body.username,
    });

    if (users.length !== 0) {
      throw new Error("Account already existed!");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();

    res.status(200).send({
      username: newUser.username,
    });
  } catch (errorMessage) {
    res.status(409).send({ error: errorMessage });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      throw new Error("Cant fetch users database");
    }

    res.status(200).send(users);
  } catch (error) {
    console.log("error:", error);
    res.status(409).send(`${error}`);
  }
};

exports.getSpecificUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res
      .status(404)
      .send({ statusText: "Cannot find any user with given id" });
  }

  res.status(200).send(user);
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // Update data from the request body

  // Use findByIdAndUpdate to find and update the user
  // The { new: true } option returns the updated document
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).send({ statusText: "User not found" });
  }

  res.status(200).send(updatedUser);
};
