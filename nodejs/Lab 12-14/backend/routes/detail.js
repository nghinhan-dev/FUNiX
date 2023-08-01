const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/:bookId", booksController.getSpecBook);
// router.post("/delete", booksController.postDelBook);

module.exports = router;
