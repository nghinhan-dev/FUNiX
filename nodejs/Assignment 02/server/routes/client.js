const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

// GET method
router.get("/overall_hotel", clientController.overallHotel);
router.get("/hotels", clientController.getHotel);
router.get("/get_type_rooms", clientController.getTypeRoom);
router.get("/get_rooms", clientController.getRoom);
router.get("/get_users", clientController.getUsers);

// POST method
router.post("/search", clientController.search);
router.post("/login", clientController.loginUser);
router.post("/createUser", clientController.clientCreateUser);
router.post("/admin_create_user", clientController.adminCreateUser);

module.exports = router;
