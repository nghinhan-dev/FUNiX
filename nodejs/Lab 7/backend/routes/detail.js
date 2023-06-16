const express = require("express");
const router = express.Router();

const shopController = require("../controllers/edit");

router.get("/:bookId", shopController.getSpecBook);

module.exports = router;
