const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotelController");

// Hotel methods
router.get("/hotels", hotelController.getHotel);
router.get("/overall_hotel", hotelController.overallHotel);
router.post("/search", hotelController.search);
router.get("/hotel/:id", hotelController.getSpecificHotel);

module.exports = router;
