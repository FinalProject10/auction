// sendMessageToUser(3, "test");
const Bid = require("../models/bid");
const Item = require("../models/items");
const Client = require("../models/clients");
const { sendMessageToRoom } = require("../utils/socketUtils");
const depositController = require("./depositController");
const proxyBidController = require("./proxyBidController");
const sellerApprovalController = require("./sellerApprovalController");

const bidController = {
  placeBid: async (req, res) => {
    const { userId, itemId, bidAmount } = req.body;

    try {
      // Validate input
      if (!userId || !itemId || !bidAmount) {
        return res.status(400).json({
          message:
            "Missing required fields: userId, itemId, and bidAmount are required.",
        });
      }

      if (bidAmount <= 0) {
        return res.status(400).json({
          message: "Bid amount must be a positive number.",
        });
      }

      // Ensure userId and itemId are integers
      const userIdInt = parseInt(userId);
      const itemIdInt = parseInt(itemId);
      
      if (isNaN(userIdInt) || isNaN(itemIdInt)) {
        return res.status(400).json({
          message: "Invalid userId or itemId format.",
        });
      }

      // Get the item and check auction status
      const item = await Item.findByPk(itemIdInt);
      if (!item) {
        return res.status(404).json({
          message: "Item not found.",
        });
      }

      // Check if auction has started
      const now = new Date();
      const auctionStartTime = new Date(item.timeStart);
      const auctionEndTime = new Date(item.timeEnd);

      if (now < auctionStartTime) {
        return res.status(400).json({
          message:
            "This auction has not started yet. Bidding will begin when the auction starts.",
          auctionStartTime: auctionStartTime,
        });
      }

      // Check if auction has ended
      if (now >= auctionEndTime) {
        return res.status(400).json({
          message: "This auction has ended. Bidding is no longer allowed.",
        });
      }

      // Get opening bid (item.price) or existing highest bid
      const openingBid = item.price || 0;

      // Check if there are any bids for THIS SPECIFIC ITEM ONLY (not all items)
      // This allows users to bid on multiple different items simultaneously,
      // but prevents them from bidding twice on the same item until someone else bids
      // Get the most recent bid for this specific item (by id DESC to get latest)
      const existingBid = await Bid.findOne({
        where: {
          itemId: itemIdInt, // Only check bids for this specific item - allows bidding on other items
        },
        order: [["id", "DESC"]], // Get most recent bid (last bid placed)
      });

      // Handle first bid (opening bid) - anyone can place the first bid on any item
      if (!existingBid) {
        // First bid must be at least the opening bid amount
        if (bidAmount < openingBid) {
          return res.status(400).json({
            message: `First bid must be at least the opening bid of $${openingBid}.`,
            minimumBid: openingBid,
            openingBid: openingBid,
          });
        }
        // Allow first bid - no further validation needed
        // User can bid on this item even if they've bid on other items
      } else {
        // ENFORCE RULE: Prevent users from outbidding themselves on THIS SPECIFIC ITEM
        // User can still bid on OTHER items, but must wait for someone else to bid on THIS item
        // Convert both to integers for proper comparison
        const existingBidderId = parseInt(existingBid.ClientId);
        
        // Debug logging (remove in production if needed)
        console.log(`Bid check - Item: ${itemIdInt}, Last bidder: ${existingBidderId}, Current user: ${userIdInt}, Last bid amount: ${existingBid.bidAmount}`);
        
        if (existingBidderId === userIdInt) {
          return res.status(400).json({
            message: `You cannot outbid yourself on this item. You are currently the highest bidder with $${existingBid.bidAmount}. Please wait for another user to place a bid first on this item before you can bid again.`,
            itemId: itemIdInt,
            currentBid: existingBid.bidAmount,
            note: "You can still bid on other items, but must wait for someone else to bid on this specific item first.",
          });
        }

        // Calculate minimum bid increment based on current bid amount
        let minIncrement;
        if (existingBid.bidAmount < 100) {
          minIncrement = 5;
        } else if (existingBid.bidAmount < 1000) {
          minIncrement = 10;
        } else if (existingBid.bidAmount < 10000) {
          minIncrement = 50;
        } else {
          minIncrement = 100;
        }

        const minimumBid = existingBid.bidAmount + minIncrement;

        // ENFORCE RULE: Bid must be greater than the last bid amount
        if (bidAmount <= existingBid.bidAmount) {
          return res.status(400).json({
            message: `Bid amount must be greater than the last bid of $${existingBid.bidAmount}. Minimum bid is $${minimumBid}.`,
            minimumBid: minimumBid,
          });
        }

        // Check if bid meets minimum increment requirement
        if (bidAmount < minimumBid) {
          return res.status(400).json({
            message: `Bid amount must be at least $${minIncrement} more than the last bid. Minimum bid is $${minimumBid}.`,
            minimumBid: minimumBid,
          });
        }
      }

      // Check deposit and max bidding power
      const biddingPowerCheck = await depositController.checkBiddingPower(
        userIdInt,
        bidAmount
      );
      if (!biddingPowerCheck.hasSufficientPower) {
        return res.status(400).json({
          message: `Insufficient bidding power. Your maximum bidding power is $${biddingPowerCheck.maxBiddingPower}. Please add more deposit.`,
          maxBiddingPower: biddingPowerCheck.maxBiddingPower,
          requestedAmount: bidAmount,
        });
      }

      // Place the bid
      const newBid = await Bid.create({
        bidAmount,
        ClientId: userIdInt,
        itemId: itemIdInt,
      });

      // Emit socket event to notify all users in the item's room
      sendMessageToRoom(itemIdInt, bidAmount.toString(), userIdInt);
      console.log(
        `✓ Bid placed: $${bidAmount} on item ${itemIdInt} by user ${userIdInt}, broadcasting to room`
      );

      // Check and execute proxy bids for other users who were outbid
      // This runs asynchronously so it doesn't block the response
      setTimeout(async () => {
        try {
          await proxyBidController.executeProxyBid(itemIdInt, bidAmount, userIdInt);
        } catch (error) {
          console.error("Error executing proxy bid:", error);
        }
      }, 100);

      return res.status(200).json({
        message: "Bid placed successfully.",
        bidAmount,
        newBid: {
          id: newBid.id,
          bidAmount: newBid.bidAmount,
        },
      });
    } catch (error) {
      console.error("Error in placeBid:", error);

      // Log the error to the console and send a detailed error response
      return res.status(500).json({
        message: `Internal server error: ${error.message}`,
        error: error.stack, // Include the full error stack for debugging purposes
      });
    }
  },
  getBids: async (req, res) => {
    const itemsPerPage = 10;
    const page = parseInt(req.query.page, 10) || 1;

    try {
      const offset = (page - 1) * itemsPerPage;
      const items = await Bid.findAll({
        where: { ClientId: req.params.id },
        include: [
          {
            model: Item,
            as: "item",
            attributes: ["name", "id"],
            required: true,
          },
          {
            model: Client,
            as: "client",
            attributes: ["name"],
            required: true,
          },
        ],
        limit: itemsPerPage,
        offset: offset,
        order: [["id", "DESC"]],
      });

      res.status(200).json(items);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  },

  // Get current highest bid for an item
  getCurrentBid: async (req, res) => {
    try {
      const { itemId } = req.params;

      const highestBid = await Bid.findOne({
        where: { itemId },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "name"],
            required: false,
          },
        ],
        order: [
          ["bidAmount", "DESC"],
          ["id", "DESC"],
        ],
      });

      if (!highestBid) {
        return res.status(200).json({
          hasBids: false,
          message: "No bids yet for this item.",
        });
      }

      res.status(200).json({
        hasBids: true,
        bid: {
          id: highestBid.id,
          bidAmount: highestBid.bidAmount,
          bidder: highestBid.client
            ? {
                id: highestBid.client.id,
                name: highestBid.client.name,
              }
            : null,
        },
      });
    } catch (error) {
      console.error("Error in getCurrentBid:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Get bid history for chart (with timestamps)
  getBidHistory: async (req, res) => {
    try {
      const { itemId } = req.params;

      const bids = await Bid.findAll({
        where: { itemId },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "name"],
            required: false,
          },
        ],
        order: [["createdAt", "ASC"]], // Order by actual createdAt timestamp
      });

      // Format data for chart using actual timestamps
      const chartData = bids.map((bid) => {
        // Use actual createdAt timestamp if available, otherwise use current time
        const bidTime = bid.createdAt ? new Date(bid.createdAt) : new Date();
        
        return {
          x: bidTime.toISOString(), // Return ISO string timestamp
          y: bid.bidAmount,
          bidder: bid.client?.name || "Unknown",
          bidderId: bid.client?.id || null,
          bidId: bid.id,
        };
      });

      res.status(200).json({
        bids: chartData,
        totalBids: bids.length,
      });
    } catch (error) {
      console.error("Error in getBidHistory:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Get auction winner
  getAuctionWinner: async (req, res) => {
    try {
      const { itemId } = req.params;

      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found." });
      }

      const now = new Date();
      const auctionEndTime = new Date(item.timeEnd);
      const isEnded = now >= auctionEndTime;

      if (!isEnded) {
        return res.status(200).json({
          ended: false,
          message: "Auction has not ended yet.",
        });
      }

      const winnerBid = await Bid.findOne({
        where: { itemId },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "name"],
            required: true,
          },
        ],
        order: [
          ["bidAmount", "DESC"],
          ["id", "ASC"],
        ],
      });

      if (!winnerBid) {
        return res.status(200).json({
          ended: true,
          hasWinner: false,
          message: "Auction ended with no bids.",
        });
      }

      // Create pending seller approval if it doesn't exist
      try {
        const SellerApproval = require("../models/sellerApproval");
        const existingApproval = await SellerApproval.findOne({
          where: { itemId, bidId: winnerBid.id },
        });

        if (!existingApproval && item.sellerId) {
          await sellerApprovalController.createPendingApproval(
            itemId,
            winnerBid.id,
            item.sellerId
          );
        }
      } catch (error) {
        console.error("Error creating seller approval:", error);
        // Don't fail the request if approval creation fails
      }

      res.status(200).json({
        ended: true,
        hasWinner: true,
        winner: {
          bidId: winnerBid.id,
          bidAmount: winnerBid.bidAmount,
          bidder: {
            id: winnerBid.client.id,
            name: winnerBid.client.name,
          },
        },
        endTime: auctionEndTime,
      });
    } catch (error) {
      console.error("Error in getAuctionWinner:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = bidController;
