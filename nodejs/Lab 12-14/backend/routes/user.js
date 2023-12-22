const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// validator
const validator = require("../middleware/validate");

router.post("/login", validator.loginValidator(), userController.login);
router.post("/logout", userController.logout);
router.post("/signup", validator.signUpValidator(), userController.signUp);

module.exports = router;
