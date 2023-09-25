const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");

// middleware
const validate = require("../middleware/validate");

router.get("/get_rooms", roomController.getRoom);
router.get("/room/:id", roomController.getSpecificRoom);
router.post("/add_room", validate.addRoom, roomController.addRoom);
router.delete("/room/:roomId/delete", roomController.delRoom);

module.exports = router;
