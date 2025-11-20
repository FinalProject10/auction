const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/calculate/:itemId", paymentController.calculatePayment);
router.post("/process", paymentController.processPayment);
router.get("/history/:clientId", paymentController.getPaymentHistory);

module.exports = router;

