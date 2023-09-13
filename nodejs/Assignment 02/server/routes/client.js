const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

// USER methods
router.get("/get_users", clientController.getUsers);
router.post("/login", clientController.loginUser);
router.post("/createUser", clientController.clientCreateUser);
router.post("/admin_create_user", clientController.adminCreateUser);
router.get("/user/:id", clientController.getSpecificUser);
router.put("/user/:id", clientController.updateUser);

// TypeRooms methods
router.get("/get_type_rooms", clientController.getTypeRoom);
router.get("/type/:id", clientController.getSpecificType);

// Rooms methods
router.get("/get_rooms", clientController.getRoom);
router.get("/room/:id", clientController.getSpecificRoom);

// Hotel methods
router.get("/hotels", clientController.getHotel);
router.get("/overall_hotel", clientController.overallHotel);
router.post("/search", clientController.search);
router.get("/hotel/:id", clientController.getSpecificHotel);

module.exports = router;
