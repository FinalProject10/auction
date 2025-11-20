const TitleTransfer = require("../models/titleTransfer");
const Item = require("../models/items");
const Client = require("../models/clients");
const Pickup = require("../models/pickup");
const { Op } = require("sequelize");

const titleTransferController = {
  // Initiate title transfer after pickup confirmation
  initiateTitleTransfer: async (req, res) => {
    try {
      const { itemId, clientId } = req.body;

      if (!itemId || !clientId) {
        return res.status(400).json({
          message: "Missing required fields: itemId and clientId are required.",
        });
      }

      // Check if pickup has been confirmed
      const pickup = await Pickup.findOne({
        where: {
          itemId,
          clientId,
          status: 'completed',
        },
      });

      if (!pickup) {
        return res.status(400).json({
          message: "Pickup must be confirmed before initiating title transfer.",
        });
      }

      // Check if title transfer already exists
      const existingTransfer = await TitleTransfer.findOne({
        where: { itemId, clientId },
      });

      if (existingTransfer) {
        return res.status(200).json({
          message: "Title transfer already initiated.",
          titleTransfer: existingTransfer,
        });
      }

      // Get item to get title type
      const item = await Item.findByPk(itemId);
      if (!item) {
        return res.status(404).json({
          message: "Item not found.",
        });
      }

      const titleTransfer = await TitleTransfer.create({
        itemId,
        clientId,
        titleType: item.titleType || 'Clean',
        status: 'pending',
      });

      res.status(201).json({
        message: "Title transfer initiated successfully.",
        titleTransfer: {
          id: titleTransfer.id,
          titleType: titleTransfer.titleType,
          status: titleTransfer.status,
          createdAt: titleTransfer.createdAt,
        },
      });
    } catch (error) {
      console.error("Error in initiateTitleTransfer:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get title transfer status
  getTitleTransferStatus: async (req, res) => {
    try {
      const { itemId } = req.params;

      const titleTransfer = await TitleTransfer.findOne({
        where: { itemId },
        include: [{
          model: Item,
          attributes: ['id', 'name', 'vin', 'lotNumber'],
        }, {
          model: Client,
          attributes: ['id', 'name', 'email'],
        }],
        order: [['createdAt', 'DESC']],
      });

      if (!titleTransfer) {
        return res.status(200).json({
          hasTransfer: false,
          message: "No title transfer record found for this item.",
        });
      }

      res.status(200).json({
        hasTransfer: true,
        titleTransfer: {
          id: titleTransfer.id,
          titleType: titleTransfer.titleType,
          status: titleTransfer.status,
          documentUrl: titleTransfer.documentUrl,
          transferDate: titleTransfer.transferDate,
          exportDocument: titleTransfer.exportDocument,
          notes: titleTransfer.notes,
          createdAt: titleTransfer.createdAt,
          updatedAt: titleTransfer.updatedAt,
          item: {
            id: titleTransfer.Item.id,
            name: titleTransfer.Item.name,
            vin: titleTransfer.Item.vin,
            lotNumber: titleTransfer.Item.lotNumber,
          },
          client: titleTransfer.Client,
        },
      });
    } catch (error) {
      console.error("Error in getTitleTransferStatus:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Upload title document
  uploadTitleDocument: async (req, res) => {
    try {
      const { titleTransferId } = req.params;
      const { documentUrl, exportDocument, notes } = req.body;

      const titleTransfer = await TitleTransfer.findByPk(titleTransferId);

      if (!titleTransfer) {
        return res.status(404).json({
          message: "Title transfer not found.",
        });
      }

      if (documentUrl) {
        titleTransfer.documentUrl = documentUrl;
      }

      if (exportDocument) {
        titleTransfer.exportDocument = exportDocument;
      }

      if (notes !== undefined) {
        titleTransfer.notes = notes;
      }

      // If document is uploaded, update status to in-transit
      if (documentUrl && titleTransfer.status === 'pending') {
        titleTransfer.status = 'in-transit';
      }

      await titleTransfer.save();

      res.status(200).json({
        message: "Title document uploaded successfully.",
        titleTransfer: {
          id: titleTransfer.id,
          documentUrl: titleTransfer.documentUrl,
          exportDocument: titleTransfer.exportDocument,
          status: titleTransfer.status,
        },
      });
    } catch (error) {
      console.error("Error in uploadTitleDocument:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Complete title transfer
  completeTitleTransfer: async (req, res) => {
    try {
      const { titleTransferId } = req.params;
      const { transferDate } = req.body;

      const titleTransfer = await TitleTransfer.findByPk(titleTransferId);

      if (!titleTransfer) {
        return res.status(404).json({
          message: "Title transfer not found.",
        });
      }

      if (titleTransfer.status === 'completed') {
        return res.status(400).json({
          message: "Title transfer has already been completed.",
        });
      }

      titleTransfer.status = 'completed';
      titleTransfer.transferDate = transferDate ? new Date(transferDate) : new Date();
      await titleTransfer.save();

      res.status(200).json({
        message: "Title transfer completed successfully.",
        titleTransfer: {
          id: titleTransfer.id,
          status: titleTransfer.status,
          transferDate: titleTransfer.transferDate,
        },
      });
    } catch (error) {
      console.error("Error in completeTitleTransfer:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Get title transfers for a client
  getClientTitleTransfers: async (req, res) => {
    try {
      const { clientId } = req.params;

      const titleTransfers = await TitleTransfer.findAll({
        where: { clientId },
        include: [{
          model: Item,
          attributes: ['id', 'name', 'vin', 'lotNumber', 'images'],
        }],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        titleTransfers: titleTransfers.map(tt => ({
          id: tt.id,
          item: {
            id: tt.Item.id,
            name: tt.Item.name,
            vin: tt.Item.vin,
            lotNumber: tt.Item.lotNumber,
            images: tt.Item.images,
          },
          titleType: tt.titleType,
          status: tt.status,
          documentUrl: tt.documentUrl,
          transferDate: tt.transferDate,
          createdAt: tt.createdAt,
        })),
      });
    } catch (error) {
      console.error("Error in getClientTitleTransfers:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = titleTransferController;

