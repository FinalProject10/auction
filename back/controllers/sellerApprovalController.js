const SellerApproval = require("../models/sellerApproval");
const Bid = require("../models/bid");
const Item = require("../models/items");
const Seller = require("../models/sellers");
const Client = require("../models/clients");
const { Op } = require("sequelize");

const APPROVAL_DEADLINE_DAYS = 3; // Seller has 3 days to respond

const sellerApprovalController = {
  // Create pending approval after auction ends (called automatically)
  createPendingApproval: async (itemId, bidId, sellerId) => {
    try {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + APPROVAL_DEADLINE_DAYS);

      const approval = await SellerApproval.create({
        itemId,
        bidId,
        sellerId,
        status: 'pending',
        deadline,
      });

      // Update item status
      const item = await Item.findByPk(itemId);
      if (item) {
        item.auctionStatus = 'pending_approval';
        await item.save();
      }

      return approval;
    } catch (error) {
      console.error("Error in createPendingApproval:", error);
      throw error;
    }
  },

  // Seller responds to approval (approve/reject/counteroffer)
  respondToApproval: async (req, res) => {
    try {
      const { approvalId } = req.params;
      const { status, sellerResponse, counterofferAmount } = req.body;
      const sellerId = req.user?.id || req.body.sellerId; // Assuming auth middleware sets req.user

      if (!status || !['approved', 'rejected', 'counteroffer'].includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Must be 'approved', 'rejected', or 'counteroffer'.",
        });
      }

      const approval = await SellerApproval.findByPk(approvalId, {
        include: [{
          model: Item,
          attributes: ['id', 'name', 'sellers_id'],
        }, {
          model: Bid,
          attributes: ['id', 'bidAmount', 'ClientId'],
        }],
      });

      if (!approval) {
        return res.status(404).json({
          message: "Approval not found.",
        });
      }

      // Verify seller owns this item
      if (approval.Item.sellers_id !== sellerId && !req.user?.isAdmin) {
        return res.status(403).json({
          message: "You do not have permission to respond to this approval.",
        });
      }

      if (approval.status !== 'pending') {
        return res.status(400).json({
          message: `Approval has already been ${approval.status}.`,
        });
      }

      // Check if deadline has passed
      const now = new Date();
      if (now > new Date(approval.deadline)) {
        return res.status(400).json({
          message: "Approval deadline has passed.",
        });
      }

      // Validate counteroffer
      if (status === 'counteroffer') {
        if (!counterofferAmount || counterofferAmount <= approval.Bid.bidAmount) {
          return res.status(400).json({
            message: "Counteroffer amount must be greater than the winning bid amount.",
          });
        }
      }

      // Update approval
      approval.status = status;
      approval.sellerResponse = sellerResponse || null;
      approval.counterofferAmount = status === 'counteroffer' ? counterofferAmount : null;
      approval.respondedAt = now;
      await approval.save();

      // Update item status
      const item = await Item.findByPk(approval.itemId);
      if (item) {
        if (status === 'approved') {
          item.auctionStatus = 'sold';
          item.sold = true;
        } else if (status === 'rejected') {
          item.auctionStatus = 'ended';
        } else if (status === 'counteroffer') {
          item.auctionStatus = 'pending_approval'; // Still pending buyer response
        }
        await item.save();
      }

      res.status(200).json({
        message: `Approval ${status} successfully.`,
        approval: {
          id: approval.id,
          status: approval.status,
          sellerResponse: approval.sellerResponse,
          counterofferAmount: approval.counterofferAmount,
          respondedAt: approval.respondedAt,
        },
      });
    } catch (error) {
      console.error("Error in respondToApproval:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get pending approvals for a seller
  getPendingApprovals: async (req, res) => {
    try {
      const { sellerId } = req.params;

      if (!sellerId) {
        return res.status(400).json({
          message: "Seller ID is required.",
        });
      }

      const approvals = await SellerApproval.findAll({
        where: {
          sellerId,
          status: 'pending',
        },
        include: [{
          model: Item,
          attributes: ['id', 'name', 'price', 'images', 'timeEnd'],
          required: true,
        }, {
          model: Bid,
          attributes: ['id', 'bidAmount', 'createdAt'],
          include: [{
            model: Client,
            attributes: ['id', 'name', 'email'],
          }],
          required: true,
        }],
        order: [['deadline', 'ASC']], // Show closest deadline first
      });

      res.status(200).json({
        approvals: approvals.map(approval => ({
          id: approval.id,
          item: {
            id: approval.Item.id,
            name: approval.Item.name,
            price: approval.Item.price,
            images: approval.Item.images,
            auctionEndTime: approval.Item.timeEnd,
          },
          bid: {
            id: approval.Bid.id,
            bidAmount: approval.Bid.bidAmount,
            bidder: {
              id: approval.Bid.Client.id,
              name: approval.Bid.Client.name,
              email: approval.Bid.Client.email,
            },
            bidTime: approval.Bid.createdAt,
          },
          deadline: approval.deadline,
          createdAt: approval.createdAt,
        })),
      });
    } catch (error) {
      console.error("Error in getPendingApprovals:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get approval status for an item
  getApprovalStatus: async (req, res) => {
    try {
      const { itemId } = req.params;

      const approval = await SellerApproval.findOne({
        where: { itemId },
        include: [{
          model: Item,
          attributes: ['id', 'name'],
        }, {
          model: Bid,
          attributes: ['id', 'bidAmount'],
          include: [{
            model: Client,
            attributes: ['id', 'name'],
          }],
        }, {
          model: Seller,
          attributes: ['id', 'name'],
        }],
        order: [['createdAt', 'DESC']],
      });

      if (!approval) {
        return res.status(200).json({
          hasApproval: false,
          message: "No approval record found for this item.",
        });
      }

      res.status(200).json({
        hasApproval: true,
        approval: {
          id: approval.id,
          status: approval.status,
          sellerResponse: approval.sellerResponse,
          counterofferAmount: approval.counterofferAmount,
          deadline: approval.deadline,
          respondedAt: approval.respondedAt,
          createdAt: approval.createdAt,
          bid: {
            id: approval.Bid.id,
            bidAmount: approval.Bid.bidAmount,
            bidder: approval.Bid.Client,
          },
        },
      });
    } catch (error) {
      console.error("Error in getApprovalStatus:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = sellerApprovalController;

