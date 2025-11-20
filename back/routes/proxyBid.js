const express = require("express");
const router = express.Router();
const proxyBidController = require("../controllers/proxyBidController");
const { validateProxyBid } = require("../middleware/validation");

router.post("/create", validateProxyBid, proxyBidController.createProxyBid);
router.get("/active/:clientId", proxyBidController.getActiveProxyBids);
router.delete("/:id", proxyBidController.deleteProxyBid);

module.exports = router;

