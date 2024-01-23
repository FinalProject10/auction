const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidControllers");

router.post("/placeBid", bidController.placeBid);

router.get("/bidNotification", async (req, res) => {
  try {
    const lastBid = await Bid.findOne({
      attributes: ["bidAmount", "createdAt"],
      include: {
        model: Client,
        attributes: ["name"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (lastBid) {
      const bidData = {
        bidAmount: lastBid.bidAmount,
        userName: lastBid.Client.name,
        bidDate: lastBid.createdAt,
      };

      sendMessageToUser(3, JSON.stringify(bidData));
      return res.json({ bidData });
    } else {
      return res.json({ message: "No bids found" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
