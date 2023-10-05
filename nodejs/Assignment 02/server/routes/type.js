const express = require("express");
const router = express.Router();

const typeController = require("../controllers/typeController");
// validator
const validate = require("../middleware/validate");

// TypeRooms methods
router.post("/add_type", validate.validType, typeController.addType);
router.get("/get_type_rooms", typeController.getTypeRoom);
router.get("/type/:id", typeController.getSpecificType);
router.put("/type/:id", validate.validType, typeController.updateType);

module.exports = router;
