const express = require("express");
const router = express.Router();

const shopController = require("../controllers/edit");
const productsController = require("../controllers/products");

router.get("/:bookId", shopController.getSpecBook);
router.post("/delete", productsController.postDelBook);

module.exports = router;
