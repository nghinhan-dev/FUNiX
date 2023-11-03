const express = require("express");
const router = express.Router();
// validator
const validate = require("../middleware/validate");

const transactionController = require("../controllers/transactionController");

router.post(
  "/booking",
  validate.validateReqBody,
  transactionController.booking
);
router.get("/transactions", transactionController.getTrans);
router.get("/:username/transaction", transactionController.getUserTrans);

module.exports = router;
