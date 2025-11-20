const Deposit = require("../models/deposit");
const Client = require("../models/clients");
const { Op } = require("sequelize");

const DEPOSIT_MULTIPLIER = 10; // $400 deposit = $4,000 max bidding power

const depositController = {
  // Add a new deposit
  addDeposit: async (req, res) => {
    try {
      const { clientId, amount, paymentMethod, transactionId, skipPayment } = req.body;
      const isTestingMode = process.env.TESTING_MODE === 'true' || skipPayment === true;

      if (!clientId || !amount) {
        return res.status(400).json({
          message: "Missing required fields: clientId and amount are required.",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          message: "Deposit amount must be greater than zero.",
        });
      }

      // In testing mode, skip payment validation
      if (isTestingMode) {
        console.log(`🧪 Testing Mode: Skipping payment validation for deposit of $${amount}`);
      }

      // Calculate max bidding power
      const maxBiddingPower = amount * DEPOSIT_MULTIPLIER;

      // Create deposit
      const deposit = await Deposit.create({
        clientId,
        amount,
        status: 'active',
        maxBiddingPower,
        paymentMethod: isTestingMode ? 'test_mode' : (paymentMethod || null),
        transactionId: transactionId || null,
      });

      res.status(201).json({
        message: "Deposit added successfully.",
        deposit: {
          id: deposit.id,
          amount: deposit.amount,
          maxBiddingPower: deposit.maxBiddingPower,
          status: deposit.status,
          createdAt: deposit.createdAt,
        },
      });
    } catch (error) {
      console.error("Error in addDeposit:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get current deposit balance and max bidding power for a client
  getBalance: async (req, res) => {
    try {
      const { clientId } = req.params;

      if (!clientId) {
        return res.status(400).json({
          message: "Client ID is required.",
        });
      }

      // Get all active deposits
      const deposits = await Deposit.findAll({
        where: {
          clientId,
          status: 'active',
        },
        order: [['createdAt', 'DESC']],
      });

      // Calculate total balance and max bidding power
      const totalBalance = deposits.reduce((sum, deposit) => {
        return sum + parseFloat(deposit.amount);
      }, 0);

      const totalMaxBiddingPower = deposits.reduce((sum, deposit) => {
        return sum + parseFloat(deposit.maxBiddingPower || 0);
      }, 0);

      res.status(200).json({
        clientId: parseInt(clientId),
        totalBalance,
        totalMaxBiddingPower,
        activeDeposits: deposits.length,
        deposits: deposits.map(d => ({
          id: d.id,
          amount: d.amount,
          maxBiddingPower: d.maxBiddingPower,
          status: d.status,
          createdAt: d.createdAt,
        })),
      });
    } catch (error) {
      console.error("Error in getBalance:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get deposit history for a client
  getHistory: async (req, res) => {
    try {
      const { clientId } = req.params;
      const page = parseInt(req.query.page, 10) || 1;
      const itemsPerPage = 20;

      if (!clientId) {
        return res.status(400).json({
          message: "Client ID is required.",
        });
      }

      const offset = (page - 1) * itemsPerPage;

      const { count, rows } = await Deposit.findAndCountAll({
        where: { clientId },
        include: [{
          model: Client,
          attributes: ['id', 'name', 'email'],
          required: false,
        }],
        order: [['createdAt', 'DESC']],
        limit: itemsPerPage,
        offset: offset,
      });

      res.status(200).json({
        deposits: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / itemsPerPage),
          totalItems: count,
          itemsPerPage,
        },
      });
    } catch (error) {
      console.error("Error in getHistory:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Refund a deposit
  refundDeposit: async (req, res) => {
    try {
      const { depositId } = req.params;
      const { reason } = req.body;

      const deposit = await Deposit.findByPk(depositId);

      if (!deposit) {
        return res.status(404).json({
          message: "Deposit not found.",
        });
      }

      if (deposit.status !== 'active') {
        return res.status(400).json({
          message: `Cannot refund deposit with status: ${deposit.status}`,
        });
      }

      deposit.status = 'refunded';
      await deposit.save();

      res.status(200).json({
        message: "Deposit refunded successfully.",
        deposit: {
          id: deposit.id,
          amount: deposit.amount,
          status: deposit.status,
          refundedAt: deposit.updatedAt,
        },
      });
    } catch (error) {
      console.error("Error in refundDeposit:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Check if client has sufficient bidding power
  checkBiddingPower: async (clientId, bidAmount) => {
    try {
      const deposits = await Deposit.findAll({
        where: {
          clientId,
          status: 'active',
        },
      });

      const totalMaxBiddingPower = deposits.reduce((sum, deposit) => {
        return sum + parseFloat(deposit.maxBiddingPower || 0);
      }, 0);

      return {
        hasSufficientPower: bidAmount <= totalMaxBiddingPower,
        maxBiddingPower: totalMaxBiddingPower,
        requestedAmount: bidAmount,
      };
    } catch (error) {
      console.error("Error in checkBiddingPower:", error);
      return {
        hasSufficientPower: false,
        maxBiddingPower: 0,
        requestedAmount: bidAmount,
        error: error.message,
      };
    }
  },
};

module.exports = depositController;

