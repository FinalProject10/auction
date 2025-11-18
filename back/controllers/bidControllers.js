// sendMessageToUser(3, "test");
const Bid = require("../models/bid");
const Item = require("../models/items");
const Client = require("../models/clients");
const { sendMessageToRoom } = require("../utils/socketUtils");

const bidController = {
  placeBid: async (req, res) => {
    const { userId, itemId, bidAmount } = req.body;

    try {
      // Validate input
      if (!userId || !itemId || !bidAmount) {
        return res.status(400).json({
          message: "Missing required fields: userId, itemId, and bidAmount are required.",
        });
      }

      if (bidAmount <= 0) {
        return res.status(400).json({
          message: "Bid amount must be a positive number.",
        });
      }

      // Get the item and check if auction has ended
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({
          message: "Item not found.",
        });
      }

      // Check if auction has ended
      const now = new Date();
      const auctionEndTime = new Date(item.timeEnd);
      if (now >= auctionEndTime) {
        return res.status(400).json({
          message: "This auction has ended. Bidding is no longer allowed.",
        });
      }

      // Check if there are any bids for this item
      const existingBid = await Bid.findOne({
        where: {
          itemId,
        },
        order: [["createdAt", "DESC"]],
      });

      // ENFORCE RULE: Users can ONLY bid if someone else has already bid (no first bid allowed)
      if (!existingBid) {
        return res.status(400).json({
          message: "You cannot place the first bid. Please wait for someone else to start the bidding.",
        });
      }

      // ENFORCE RULE: Prevent users from outbidding themselves
      if (existingBid.ClientId === userId) {
        return res.status(400).json({
          message: "You cannot outbid yourself. Please wait for another user to place a bid first.",
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

      // Place the bid
      const newBid = await Bid.create({
        bidAmount,
        ClientId: userId,
        itemId,
      });

      // Emit socket event to notify all users in the item's room
      sendMessageToRoom(itemId, bidAmount.toString(), userId);
      console.log(`✓ Bid placed: $${bidAmount} on item ${itemId}, broadcasting to room`);

      return res.status(200).json({ 
        message: "Bid placed successfully.", 
        bidAmount,
        newBid: {
          id: newBid.id,
          bidAmount: newBid.bidAmount,
          createdAt: newBid.createdAt
        }
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
        include: [{
          model: Item,
          attributes: ['name', 'id'],
          required: true
        }, {
          model: Client,
          attributes: ['name'],
          required: true
        }],
        limit: itemsPerPage,
        offset: offset,
        order: [['createdAt', 'DESC']]
      });
    
      res.status(200).json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  },

  // Get current highest bid for an item
  getCurrentBid: async (req, res) => {
    try {
      const { itemId } = req.params;
      
      const highestBid = await Bid.findOne({
        where: { itemId },
        include: [{
          model: Client,
          attributes: ['id', 'name'],
          required: false
        }],
        order: [['bidAmount', 'DESC'], ['createdAt', 'DESC']],
      });

      if (!highestBid) {
        return res.status(200).json({ 
          hasBids: false,
          message: "No bids yet for this item."
        });
      }

      res.status(200).json({
        hasBids: true,
        bid: {
          id: highestBid.id,
          bidAmount: highestBid.bidAmount,
          createdAt: highestBid.createdAt,
          bidder: highestBid.Client ? {
            id: highestBid.Client.id,
            name: highestBid.Client.name
          } : null
        }
      });
    } catch (error) {
      console.error("Error in getCurrentBid:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Get bid history for chart (with timestamps)
  getBidHistory: async (req, res) => {
    try {
      const { itemId } = req.params;
      
      const bids = await Bid.findAll({
        where: { itemId },
        include: [{
          model: Client,
          attributes: ['id', 'name'],
          required: true
        }],
        order: [['createdAt', 'ASC']],
      });

      // Format data for chart
      const chartData = bids.map(bid => ({
        x: bid.createdAt,
        y: bid.bidAmount,
        bidder: bid.Client.name,
        bidderId: bid.Client.id,
        bidId: bid.id
      }));

      res.status(200).json({
        bids: chartData,
        totalBids: bids.length
      });
    } catch (error) {
      console.error("Error in getBidHistory:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
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
          message: "Auction has not ended yet."
        });
      }

      const winnerBid = await Bid.findOne({
        where: { itemId },
        include: [{
          model: Client,
          attributes: ['id', 'name'],
          required: true
        }],
        order: [['bidAmount', 'DESC'], ['createdAt', 'ASC']],
      });

      if (!winnerBid) {
        return res.status(200).json({
          ended: true,
          hasWinner: false,
          message: "Auction ended with no bids."
        });
      }

      res.status(200).json({
        ended: true,
        hasWinner: true,
        winner: {
          bidId: winnerBid.id,
          bidAmount: winnerBid.bidAmount,
          bidder: {
            id: winnerBid.Client.id,
            name: winnerBid.Client.name
          },
          bidTime: winnerBid.createdAt
        },
        endTime: auctionEndTime
      });
    } catch (error) {
      console.error("Error in getAuctionWinner:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

module.exports = bidController
