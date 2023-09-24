const express = require("express");
const router = express.Router();

const typeController = require("../controllers/typeController");
// validator
const validate = require("../middleware/validate");

// TypeRooms methods
router.get("/get_type_rooms", typeController.getTypeRoom);
router.get("/type/:id", typeController.getSpecificType);
router.put("/type/:id", validate.addType, typeController.updateRoom);

module.exports = router;
