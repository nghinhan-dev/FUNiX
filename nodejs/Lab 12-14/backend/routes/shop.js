const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const shopController = require("../controllers/cart");
const orderController = require("../controllers/order");

const loginAuth = require("../middleware/auth");

router.get("/book_list", booksController.getBookList);
router.get("/cart", loginAuth.loginAuth, shopController.getCart);
router.post("/edit-book", booksController.updateBook);
router.post("/add-cart", loginAuth.loginAuth, shopController.postToCart);
router.post("/delete-item", shopController.delFromCart);
router.post("/create-order", orderController.postOrder);
router.get("/get-orders", orderController.getOrder);

module.exports = router;
