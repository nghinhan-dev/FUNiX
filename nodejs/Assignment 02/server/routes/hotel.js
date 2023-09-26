const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotelController");

// validator
const validate = require("../middleware/validate");

// Hotel methods
router.get("/hotels", hotelController.getHotel);
router.get("/overall_hotel", hotelController.overallHotel);
router.post("/search", hotelController.search);
router.get("/hotel/:id", hotelController.getSpecificHotel);
router.put("/hotel/:id", validate.addHotel, hotelController.updateHotel);
router.post("/add_hotel", validate.addHotel, hotelController.addHotel);
router.delete("/hotel/:hotelId/delete", hotelController.delHotel);

module.exports = router;
