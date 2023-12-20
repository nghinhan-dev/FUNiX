const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/signup", userController.signUp);

module.exports = router;
