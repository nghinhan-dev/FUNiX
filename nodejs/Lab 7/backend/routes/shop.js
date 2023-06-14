const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const shopController = require("../controllers/shopC");

router.get("/book_list", productsController.getBookList);
router.post("/add-cart", shopController.postToCart);

module.exports = router;
