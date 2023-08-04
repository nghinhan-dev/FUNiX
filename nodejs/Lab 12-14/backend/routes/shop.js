const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const shopController = require("../controllers/cart");
const orderController = require("../controllers/order");

router.get("/book_list", booksController.getBookList);
router.get("/cart", shopController.getCart);
router.post("/edit-book", booksController.updateBook);
router.post("/add-cart", shopController.postToCart);
router.post("/delete-item", shopController.delFromCart);
router.post("/create-order", orderController.postOrder);
router.get("/get-orders", orderController.getOrder);

module.exports = router;
