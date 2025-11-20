const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidControllers");
const { Bid, Client } = require("../models/relations");
const { sendMessageToRoom } = require("../utils/socketUtils");
const { validateBid } = require("../middleware/validation");

router.post("/placeBid", validateBid, bidController.placeBid);
router.get("/fetch-items/:id", bidController.getBids);
router.get("/current/:itemId", bidController.getCurrentBid);
router.get("/history/:itemId", bidController.getBidHistory);
router.get("/winner/:itemId", bidController.getAuctionWinner);

// Legacy endpoint for backward compatibility
router.get("/bidNotification/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const lastBid = await Bid.findOne({
      where: { itemId },
      attributes: ["bidAmount", "id"],
      include: {
        model: Client,
        as: "client",
        attributes: ["name"],
      },
      order: [["id", "DESC"]],
    });

    if (lastBid) {
      const bidAmount = parseInt(lastBid.bidAmount, 10);
      sendMessageToRoom(parseInt(itemId), bidAmount.toString());
      return res.json(bidAmount);
    } else {
      return res.json({ message: "No bids found" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
