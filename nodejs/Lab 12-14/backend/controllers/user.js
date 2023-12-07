const { getDB } = require("../util/database");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const db = getDB();

  try {
    const user = await db.collection("users").findOne({ username: username });

    if (!user) {
      throw new Error("Cannot find user");
    }

    if (password !== user.password) {
      throw new Error("Wrong password");
    }

    res.cookie("isLogin", true, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
    });
    res.status(200).send({ statusText: "Succesfully login" });
  } catch (error) {
    console.log("error:", error);
    res.status(400).send({ statusText: error });
  }
};