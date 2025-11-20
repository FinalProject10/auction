const ProxyBid = require("../models/proxyBid");
const Bid = require("../models/bid");
const Item = require("../models/items");
const Client = require("../models/clients");
const { sendMessageToRoom } = require("../utils/socketUtils");
const { Op } = require("sequelize");

const proxyBidController = {
  // Create a proxy bid
  createProxyBid: async (req, res) => {
    try {
      const { clientId, itemId, maxAmount, incrementAmount } = req.body;

      if (!clientId || !itemId || !maxAmount) {
        return res.status(400).json({
          message:
            "Missing required fields: clientId, itemId, and maxAmount are required.",
        });
      }

      if (maxAmount <= 0) {
        return res.status(400).json({
          message: "Maximum proxy bid amount must be greater than zero.",
        });
      }

      // Check if auction exists and is active
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({
          message: "Item not found.",
        });
      }

      const now = new Date();
      const auctionStartTime = new Date(item.timeStart);
      const auctionEndTime = new Date(item.timeEnd);

      if (now < auctionStartTime) {
        return res.status(400).json({
          message: "Auction has not started yet.",
        });
      }

      if (now >= auctionEndTime) {
        return res.status(400).json({
          message: "Auction has ended. Cannot create proxy bid.",
        });
      }

      // Check if proxy bid already exists for this client and item
      let existingProxy;
      try {
        existingProxy = await ProxyBid.findOne({
          where: {
            clientId,
            itemId,
            isActive: true,
          },
        });
      } catch (tableError) {
        if (
          tableError.message &&
          tableError.message.includes("doesn't exist")
        ) {
          return res.status(503).json({
            message:
              "Proxy bidding feature is not available. The proxy_bids table has not been created yet.",
            error: "Table 'proxy_bids' doesn't exist",
          });
        }
        throw tableError;
      }

      if (existingProxy) {
        // Update existing proxy bid
        existingProxy.maxAmount = maxAmount;
        existingProxy.incrementAmount = incrementAmount || null;
        await existingProxy.save();

        return res.status(200).json({
          message: "Proxy bid updated successfully.",
          proxyBid: {
            id: existingProxy.id,
            maxAmount: existingProxy.maxAmount,
            currentBid: existingProxy.currentBid,
            isActive: existingProxy.isActive,
          },
        });
      }

      // Get current highest bid to determine starting point
      const currentHighestBid = await Bid.findOne({
        where: { itemId },
        order: [
          ["bidAmount", "DESC"],
          ["id", "DESC"],
        ],
      });

      const openingBid = item.price || 0;
      const currentBid = currentHighestBid
        ? currentHighestBid.bidAmount
        : openingBid;

      // Create new proxy bid
      const proxyBid = await ProxyBid.create({
        clientId,
        itemId,
        maxAmount,
        currentBid: currentBid,
        isActive: true,
        incrementAmount: incrementAmount || null,
      });

      res.status(201).json({
        message: "Proxy bid created successfully.",
        proxyBid: {
          id: proxyBid.id,
          maxAmount: proxyBid.maxAmount,
          currentBid: proxyBid.currentBid,
          isActive: proxyBid.isActive,
        },
      });
    } catch (error) {
      console.error("Error in createProxyBid:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get active proxy bids for a client
  getActiveProxyBids: async (req, res) => {
    try {
      const { clientId } = req.params;

      if (!clientId) {
        return res.status(400).json({
          message: "Client ID is required.",
        });
      }

      const proxyBids = await ProxyBid.findAll({
        where: {
          clientId,
          isActive: true,
        },
        include: [
          {
            model: Item,
            as: "item",
            attributes: ["id", "name", "price", "timeEnd"],
            required: false, // LEFT JOIN - don't fail if item doesn't exist
          },
        ],
        order: [["id", "DESC"]],
      });

      res.status(200).json({
        proxyBids: proxyBids.map((pb) => ({
          id: pb.id,
          itemId: pb.itemId,
          itemName: pb.item?.name || pb.Item?.name || null,
          maxAmount: pb.maxAmount,
          currentBid: pb.currentBid,
          isActive: pb.isActive,
        })),
      });
    } catch (error) {
      console.error("Error in getActiveProxyBids:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Delete/cancel a proxy bid
  deleteProxyBid: async (req, res) => {
    try {
      const { id } = req.params;

      const proxyBid = await ProxyBid.findByPk(id);

      if (!proxyBid) {
        return res.status(404).json({
          message: "Proxy bid not found.",
        });
      }

      proxyBid.isActive = false;
      await proxyBid.save();

      res.status(200).json({
        message: "Proxy bid cancelled successfully.",
      });
    } catch (error) {
      console.error("Error in deleteProxyBid:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Execute proxy bid when user is outbid (called internally)
  executeProxyBid: async (itemId, newBidAmount, newBidderId) => {
    try {
      // Find all active proxy bids for this item where maxAmount > newBidAmount
      const proxyBids = await ProxyBid.findAll({
        where: {
          itemId,
          isActive: true,
          maxAmount: {
            [Op.gt]: newBidAmount,
          },
          clientId: {
            [Op.ne]: newBidderId, // Don't execute for the same bidder
          },
        },
        order: [["maxAmount", "ASC"]], // Execute lowest maxAmount first
      });

      if (proxyBids.length === 0) {
        return null;
      }

      // Get the proxy bid with the lowest maxAmount (first to execute)
      const proxyBid = proxyBids[0];

      // Calculate minimum increment
      let minIncrement;
      if (newBidAmount < 100) {
        minIncrement = 5;
      } else if (newBidAmount < 1000) {
        minIncrement = 10;
      } else if (newBidAmount < 10000) {
        minIncrement = 50;
      } else {
        minIncrement = 100;
      }

      const incrementToUse = proxyBid.incrementAmount || minIncrement;
      const nextBidAmount = newBidAmount + incrementToUse;

      // Check if next bid would exceed maxAmount
      if (nextBidAmount > proxyBid.maxAmount) {
        // Deactivate proxy bid if maxAmount reached
        proxyBid.isActive = false;
        await proxyBid.save();
        return null;
      }

      // Place the proxy bid
      const bid = await Bid.create({
        bidAmount: nextBidAmount,
        ClientId: proxyBid.clientId,
        itemId: itemId,
      });

      // Update proxy bid currentBid
      proxyBid.currentBid = nextBidAmount;
      await proxyBid.save();

      // Emit socket event
      sendMessageToRoom(itemId, nextBidAmount.toString(), proxyBid.clientId);

      console.log(
        `✓ Proxy bid executed: $${nextBidAmount} on item ${itemId} by client ${proxyBid.clientId}`
      );

      return {
        bid,
        proxyBid,
        executed: true,
      };
    } catch (error) {
      console.error("Error in executeProxyBid:", error);
      return null;
    }
  },
};

module.exports = proxyBidController;
