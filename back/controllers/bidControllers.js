// sendMessageToUser(3, "test");
const Bid = require("../models/bid");
const Item = require("../models/items");

const bidController = {
  placeBid: async (req, res) => {
    const { userId, itemId, bidAmount } = req.body;

    try {
      // Check if the user has already placed a bid for this item
      const existingBid = await Bid.findOne({
        where: {
          ClientId: userId,
          itemId,
        },
      });

      if (existingBid) {
        return res
          .status(400)
          .json({ message: "User can bid only once for an item." });
      }

      // Check if the bid amount is greater than the last bid amount and item price
      const lastBid = await Bid.findOne({
        where: {
          itemId,
        },
        order: [["createdAt", "DESC"]],
      });

      const item = await Item.findByPk(itemId);

      if (
        !lastBid ||
        bidAmount <= lastBid.bidAmount ||
        bidAmount <= item.price
      ) {
        return res.status(400).json({
          message:
            "Bid amount should be greater than the last bid amount and item price.",
        });
      }

      // Place the bid
      await Bid.create({
        bidAmount,
        ClientId: userId,
        itemId,
      });

      return res.status(200).json({ message: "Bid placed successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = bidController;
