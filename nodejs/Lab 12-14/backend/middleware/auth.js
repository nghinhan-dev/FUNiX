const User = require("../model/user");

exports.loginAuth = async (req, res, next) => {
  try {
    if (req.session.userID) {
      const user = await User.findById(req.session.userID);
      if (user) {
        req.user = user;
        return next();
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("Login first");
    }
  } catch (error) {
    console.error("Error in loginAuth:", error);
    res.status(500).send("Internal Server Error");
  }
};
