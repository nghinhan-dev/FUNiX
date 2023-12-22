const express = require("express");
const router = express.Router();

const productsController = require("../controllers/books");
const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const booksController = require("../controllers/books");
const shopController = require("../controllers/cart");

router.post(
  "/add-product",
  auth.loginAuth,
  validator.signUpValidator,
  productsController.postBook
);

router.post("/edit-book", auth.loginAuth, booksController.updateBook);
router.post("/delete-item", auth.loginAuth, shopController.delFromCart);

module.exports = router;
