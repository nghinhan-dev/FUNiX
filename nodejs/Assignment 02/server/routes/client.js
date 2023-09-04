const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

router.post("/login", clientController.loginUser);
router.post("/createUser", clientController.createUser);
router.get("/overall_hotel", clientController.overallHotel);
router.get("/hotels", clientController.getHotel);
router.post("/search", clientController.search);

module.exports = router;
