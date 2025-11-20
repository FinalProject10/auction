const Pickup = require("../models/pickup");
const Item = require("../models/items");
const Client = require("../models/clients");
const AuctionPayment = require("../models/auctionPayment");
const { Op } = require("sequelize");

const PICKUP_DEADLINE_DAYS = 5; // 5 days after payment to pickup

const pickupController = {
  // Schedule pickup after payment
  schedulePickup: async (req, res) => {
    try {
      const { itemId, clientId, scheduledDate, transportationCompany } = req.body;

      if (!itemId || !clientId) {
        return res.status(400).json({
          message: "Missing required fields: itemId and clientId are required.",
        });
      }

      // Check if payment has been made
      const payment = await AuctionPayment.findOne({
        where: {
          itemId,
          clientId,
          status: 'paid',
        },
      });

      if (!payment) {
        return res.status(400).json({
          message: "Payment must be completed before scheduling pickup.",
        });
      }

      // Check if pickup already exists
      const existingPickup = await Pickup.findOne({
        where: { itemId, clientId },
      });

      // Calculate pickup deadline
      const deadline = new Date(payment.paidAt || new Date());
      deadline.setDate(deadline.getDate() + PICKUP_DEADLINE_DAYS);

      // Generate release document URL (in real implementation, this would generate a PDF)
      const releaseDocument = `/documents/release/${itemId}-${clientId}-${Date.now()}.pdf`;

      let pickup;
      if (existingPickup) {
        pickup = existingPickup;
        pickup.scheduledDate = scheduledDate ? new Date(scheduledDate) : null;
        pickup.transportationCompany = transportationCompany || null;
        pickup.status = scheduledDate ? 'scheduled' : 'pending';
        await pickup.save();
      } else {
        pickup = await Pickup.create({
          itemId,
          clientId,
          scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
          pickupDeadline: deadline,
          status: scheduledDate ? 'scheduled' : 'pending',
          releaseDocument,
          transportationCompany: transportationCompany || null,
        });
      }

      res.status(200).json({
        message: "Pickup scheduled successfully.",
        pickup: {
          id: pickup.id,
          scheduledDate: pickup.scheduledDate,
          pickupDeadline: pickup.pickupDeadline,
          status: pickup.status,
          releaseDocument: pickup.releaseDocument,
        },
      });
    } catch (error) {
      console.error("Error in schedulePickup:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get pending pickups for a client
  getPendingPickups: async (req, res) => {
    try {
      const { clientId } = req.params;

      const pickups = await Pickup.findAll({
        where: {
          clientId,
          status: {
            [Op.in]: ['pending', 'scheduled'],
          },
        },
        include: [{
          model: Item,
          attributes: ['id', 'name', 'images', 'lotNumber'],
        }],
        order: [['pickupDeadline', 'ASC']],
      });

      // Check for late pickups
      const now = new Date();
      const updatedPickups = await Promise.all(pickups.map(async (pickup) => {
        const deadline = new Date(pickup.pickupDeadline);
        const isLate = now > deadline;
        
        if (isLate && pickup.status !== 'late') {
          // Calculate days late
          const daysLate = Math.ceil((now - deadline) / (1000 * 60 * 60 * 24));
          
          // Update storage fees
          const payment = await AuctionPayment.findOne({
            where: {
              itemId: pickup.itemId,
              status: 'paid',
            },
          });

          if (payment) {
            const additionalStorageFee = daysLate * STORAGE_FEE_PER_DAY;
            payment.storageFee = parseFloat(payment.storageFee) + additionalStorageFee;
            payment.totalAmount = parseFloat(payment.vehiclePrice) + parseFloat(payment.auctionFee) + parseFloat(payment.storageFee);
            await payment.save();
          }
          
          // Update pickup status
          pickup.status = 'late';
          pickup.lateFeeAmount = daysLate * 50; // $50 per day
          await pickup.save();
        }

        return {
          id: pickup.id,
          item: {
            id: pickup.Item.id,
            name: pickup.Item.name,
            images: pickup.Item.images,
            lotNumber: pickup.Item.lotNumber,
          },
          scheduledDate: pickup.scheduledDate,
          pickupDeadline: pickup.pickupDeadline,
          status: pickup.status,
          isLate: now > new Date(pickup.pickupDeadline),
          daysLate: isLate ? Math.ceil((now - deadline) / (1000 * 60 * 60 * 24)) : 0,
          lateFeeAmount: pickup.lateFeeAmount,
          releaseDocument: pickup.releaseDocument,
          transportationCompany: pickup.transportationCompany,
        };
      }));

      res.status(200).json({
        pickups: updatedPickups,
      });
    } catch (error) {
      console.error("Error in getPendingPickups:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Confirm pickup completion
  confirmPickup: async (req, res) => {
    try {
      const { pickupId } = req.params;

      const pickup = await Pickup.findByPk(pickupId, {
        include: [{
          model: Item,
          attributes: ['id', 'name'],
        }],
      });

      if (!pickup) {
        return res.status(404).json({
          message: "Pickup not found.",
        });
      }

      if (pickup.status === 'completed') {
        return res.status(400).json({
          message: "Pickup has already been confirmed.",
        });
      }

      pickup.status = 'completed';
      pickup.confirmedAt = new Date();
      await pickup.save();

      res.status(200).json({
        message: "Pickup confirmed successfully.",
        pickup: {
          id: pickup.id,
          status: pickup.status,
          confirmedAt: pickup.confirmedAt,
        },
      });
    } catch (error) {
      console.error("Error in confirmPickup:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Auto-create pickup after payment (called internally)
  createPickupAfterPayment: async (itemId, clientId, paidAt) => {
    try {
      const deadline = new Date(paidAt);
      deadline.setDate(deadline.getDate() + PICKUP_DEADLINE_DAYS);

      const releaseDocument = `/documents/release/${itemId}-${clientId}-${Date.now()}.pdf`;

      const pickup = await Pickup.create({
        itemId,
        clientId,
        pickupDeadline: deadline,
        status: 'pending',
        releaseDocument,
      });

      return pickup;
    } catch (error) {
      console.error("Error in createPickupAfterPayment:", error);
      return null;
    }
  },
};

module.exports = pickupController;

