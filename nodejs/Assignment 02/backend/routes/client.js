const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

router.post("/login", clientController.loginUser);

module.exports = router;
