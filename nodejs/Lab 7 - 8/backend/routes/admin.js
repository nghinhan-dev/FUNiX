const express = require("express");
const router = express.Router();

const productsController = require("../controllers/books");

router.post("/add-product", productsController.postBook);

module.exports = router;
