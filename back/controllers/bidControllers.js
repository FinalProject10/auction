// sendMessageToUser(3, "test");
const Bid = require("../models/bid");
const Item = require("../models/items");

const bidController = {
  placeBid: async (req, res) => {
    const { userId, itemId, bidAmount } = req.body;

    try {
      // Check if there are any bids for this item
      const existingBid = await Bid.findOne({
        where: {
          itemId,
        },
        order: [["createdAt", "DESC"]],
      });

      const item = await Item.findByPk(itemId);

      if (existingBid) {
        // If there is a bid, check if the last bid is not from the current user
        if (existingBid.ClientId !== userId) {
          console.log(
            "Another user has bid. Allowing current user to bid again."
          );

          // Check if the bid amount is greater than the last bid amount
          if (bidAmount <= existingBid.bidAmount) {
            return res.status(400).json({
              message: "Bid amount should be greater than the last bid amount.",
            });
          }

          // Place the bid
          await Bid.create({
            bidAmount,
            ClientId: userId,
            itemId,
          });

          return res.status(200).json({ message: "Bid placed successfully." });
        } else {
          // If the last bid is from the current user, prevent them from bidding again
          return res.status(400).json({
            message: "User can bid only once for an item.",
          });
        }
      }

      // If there are no previous bids, check if the bid amount is greater than the item price
      console.log("No previous bids. Allowing current user to bid.");

      if (bidAmount <= item.price) {
        return res.status(400).json({
          message: "Bid amount should be greater than the item price.",
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
      console.error("Error in placeBid:", error);

      // Log the error to the console and send a detailed error response
      return res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack, // Include the full error stack for debugging purposes
      });
    }
  },
};

module.exports = bidController;
