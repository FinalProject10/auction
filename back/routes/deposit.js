const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");
const { validateDeposit } = require("../middleware/validation");

router.post("/add", validateDeposit, depositController.addDeposit);
router.get("/balance/:clientId", depositController.getBalance);
router.get("/history/:clientId", depositController.getHistory);
router.put("/refund/:depositId", depositController.refundDeposit);

module.exports = router;

