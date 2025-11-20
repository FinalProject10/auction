const AuctionPayment = require("../models/auctionPayment");
const Bid = require("../models/bid");
const Item = require("../models/items");
const Client = require("../models/clients");
const SellerApproval = require("../models/sellerApproval");
const { Op } = require("sequelize");

const AUCTION_FEE_PERCENTAGE = 10; // 10% of winning bid
const STORAGE_FEE_PER_DAY = 50; // $50 per day after pickup deadline

const paymentController = {
  // Calculate payment breakdown for a won auction
  calculatePayment: async (req, res) => {
    try {
      const { itemId } = req.params;

      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({
          message: "Item not found.",
        });
      }

      // Get winning bid
      const winningBid = await Bid.findOne({
        where: { itemId },
        include: [{
          model: Client,
          attributes: ['id', 'name'],
        }],
        order: [['bidAmount', 'DESC'], ['createdAt', 'ASC']],
      });

      if (!winningBid) {
        return res.status(400).json({
          message: "No winning bid found for this item.",
        });
      }

      // Check if seller has approved
      const approval = await SellerApproval.findOne({
        where: {
          itemId,
          status: 'approved',
        },
      });

      if (!approval) {
        return res.status(400).json({
          message: "Seller has not approved this sale yet.",
        });
      }

      // Check if payment already exists
      const existingPayment = await AuctionPayment.findOne({
        where: {
          itemId,
          bidId: winningBid.id,
        },
      });

      if (existingPayment && existingPayment.status === 'paid') {
        return res.status(200).json({
          message: "Payment already processed.",
          payment: existingPayment,
        });
      }

      // Calculate fees
      const vehiclePrice = parseFloat(winningBid.bidAmount);
      const auctionFee = vehiclePrice * (AUCTION_FEE_PERCENTAGE / 100);
      const storageFee = 0; // Will be calculated if pickup is late
      const totalAmount = vehiclePrice + auctionFee + storageFee;

      // Generate invoice number
      const invoiceNumber = `INV-${itemId}-${winningBid.id}-${Date.now()}`;

      // Create or update payment record
      let payment;
      if (existingPayment) {
        payment = existingPayment;
        payment.vehiclePrice = vehiclePrice;
        payment.auctionFee = auctionFee;
        payment.storageFee = storageFee;
        payment.totalAmount = totalAmount;
        payment.invoiceNumber = invoiceNumber;
        await payment.save();
      } else {
        payment = await AuctionPayment.create({
          bidId: winningBid.id,
          itemId,
          clientId: winningBid.ClientId,
          vehiclePrice,
          auctionFee,
          storageFee,
          totalAmount,
          status: 'pending',
          invoiceNumber,
        });
      }

      res.status(200).json({
        payment: {
          id: payment.id,
          vehiclePrice,
          auctionFee,
          storageFee,
          totalAmount,
          invoiceNumber: payment.invoiceNumber,
          status: payment.status,
        },
        breakdown: {
          vehiclePrice,
          auctionFee,
          auctionFeePercentage: AUCTION_FEE_PERCENTAGE,
          storageFee,
          totalAmount,
        },
      });
    } catch (error) {
      console.error("Error in calculatePayment:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Process payment
  processPayment: async (req, res) => {
    try {
      const { paymentId, paymentMethod, transactionId } = req.body;

      const payment = await AuctionPayment.findByPk(paymentId, {
        include: [{
          model: Item,
          attributes: ['id', 'name'],
        }, {
          model: Client,
          attributes: ['id', 'name', 'email'],
        }],
      });

      if (!payment) {
        return res.status(404).json({
          message: "Payment not found.",
        });
      }

      if (payment.status === 'paid') {
        return res.status(400).json({
          message: "Payment has already been processed.",
        });
      }

      // Update payment status
      payment.status = 'paid';
      payment.paidAt = new Date();
      payment.paymentMethod = paymentMethod || null;
      payment.transactionId = transactionId || null;
      await payment.save();

      res.status(200).json({
        message: "Payment processed successfully.",
        payment: {
          id: payment.id,
          totalAmount: payment.totalAmount,
          status: payment.status,
          paidAt: payment.paidAt,
          invoiceNumber: payment.invoiceNumber,
        },
      });
    } catch (error) {
      console.error("Error in processPayment:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get payment history for a client
  getPaymentHistory: async (req, res) => {
    try {
      const { clientId } = req.params;
      const page = parseInt(req.query.page, 10) || 1;
      const itemsPerPage = 20;

      const offset = (page - 1) * itemsPerPage;

      const { count, rows } = await AuctionPayment.findAndCountAll({
        where: { clientId },
        include: [{
          model: Item,
          attributes: ['id', 'name', 'images'],
        }, {
          model: Bid,
          attributes: ['id', 'bidAmount'],
        }],
        order: [['createdAt', 'DESC']],
        limit: itemsPerPage,
        offset: offset,
      });

      res.status(200).json({
        payments: rows.map(payment => ({
          id: payment.id,
          item: {
            id: payment.Item.id,
            name: payment.Item.name,
            images: payment.Item.images,
          },
          vehiclePrice: payment.vehiclePrice,
          auctionFee: payment.auctionFee,
          storageFee: payment.storageFee,
          totalAmount: payment.totalAmount,
          status: payment.status,
          paidAt: payment.paidAt,
          invoiceNumber: payment.invoiceNumber,
          createdAt: payment.createdAt,
        })),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / itemsPerPage),
          totalItems: count,
          itemsPerPage,
        },
      });
    } catch (error) {
      console.error("Error in getPaymentHistory:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Update storage fees (called when pickup is late)
  updateStorageFees: async (itemId, daysLate) => {
    try {
      const payment = await AuctionPayment.findOne({
        where: {
          itemId,
          status: 'paid',
        },
      });

      if (!payment) {
        return null;
      }

      const additionalStorageFee = daysLate * STORAGE_FEE_PER_DAY;
      payment.storageFee = parseFloat(payment.storageFee) + additionalStorageFee;
      payment.totalAmount = parseFloat(payment.vehiclePrice) + parseFloat(payment.auctionFee) + parseFloat(payment.storageFee);
      await payment.save();

      return payment;
    } catch (error) {
      console.error("Error in updateStorageFees:", error);
      return null;
    }
  },
};

module.exports = paymentController;

