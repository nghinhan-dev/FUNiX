const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

router.post("/add-product", productsController.postNewBook);

module.exports = router;
