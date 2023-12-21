const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");
const auth = require("../middleware/auth");

router.get("/:bookId", booksController.getSpecBook);
router.post("/delete", auth.loginAuth, booksController.postDelBook);

module.exports = router;
