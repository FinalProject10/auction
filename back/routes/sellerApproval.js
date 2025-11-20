const express = require("express");
const router = express.Router();
const sellerApprovalController = require("../controllers/sellerApprovalController");
const { validateSellerApproval } = require("../middleware/validation");

router.post("/respond/:approvalId", validateSellerApproval, sellerApprovalController.respondToApproval);
router.get("/pending/:sellerId", sellerApprovalController.getPendingApprovals);
router.get("/status/:itemId", sellerApprovalController.getApprovalStatus);

module.exports = router;

