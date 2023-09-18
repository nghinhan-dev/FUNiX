const express = require("express");
const router = express.Router();

const useController = require("../controllers/userController");

// middleware
const validate = require("../middleware/validate");

router.get("/get_users", useController.getUsers);
router.post("/login", useController.loginUser);
router.post("/createUser", validate.createUser, useController.clientCreateUser);
router.post("/admin_create_user", useController.adminCreateUser);
router.get("/user/:id", useController.getSpecificUser);
router.put("/user/:id", useController.updateUser);

module.exports = router;
