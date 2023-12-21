const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const shopController = require("../controllers/cart");
const orderController = require("../controllers/order");

const auth = require("../middleware/auth");

router.get("/book_list", booksController.getBookList);

router.get("/cart", auth.loginAuth, shopController.getCart);
router.post("/edit-book", auth.loginAuth, booksController.updateBook);
router.post("/add-cart", auth.loginAuth, shopController.postToCart);
router.post("/delete-item", auth.loginAuth, shopController.delFromCart);
router.post("/create-order", auth.loginAuth, orderController.postOrder);
router.get("/get-orders", auth.loginAuth, orderController.getOrder);

module.exports = router;
