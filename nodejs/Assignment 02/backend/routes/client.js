const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

router.post("/login", clientController.loginUser);
router.post("/createUser", clientController.createUser);

module.exports = router;
