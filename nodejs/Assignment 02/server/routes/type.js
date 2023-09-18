const express = require("express");
const router = express.Router();

const typeController = require("../controllers/typeController");

// TypeRooms methods
router.get("/get_type_rooms", typeController.getTypeRoom);
router.get("/type/:id", typeController.getSpecificType);

module.exports = router;
