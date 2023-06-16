const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const shopController = require("../controllers/edit");

router.get("/book_list", productsController.getBookList);
router.get("/cart", productsController.getCart);
router.post("/edit-book", productsController.postBook);
router.post("/add-cart", shopController.postToCart);
router.post("/delete-item", shopController.delFromCart);

module.exports = router;
