const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// middleware
const validate = require("../middleware/validate");

router.get("/get_users", userController.getUsers);
router.post("/login", userController.loginUser);
router.post(
  "/createUser",
  validate.createUser,
  userController.clientCreateUser
);
router.post("/admin_create_user", userController.adminCreateUser);
router.get("/user/:id", userController.getSpecificUser);
router.put("/user/:id", userController.updateUser);
router.post("/loginAdmin", validate.validateReqBody, userController.loginAdmin);

module.exports = router;
