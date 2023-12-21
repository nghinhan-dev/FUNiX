const express = require("express");
const router = express.Router();

const productsController = require("../controllers/books");
const auth = require("../middleware/auth");

router.post("/add-product", auth.loginAuth, productsController.postBook);

module.exports = router;
