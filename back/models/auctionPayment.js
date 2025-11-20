const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const AuctionPayment = sequelize.define("auctionPayment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bidId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bid_id',
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'items_id',
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'clients_id',
  },
  vehiclePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Winning bid amount',
  },
  auctionFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: 'Auction fee (percentage of winning bid)',
  },
  storageFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: 'Storage fees if pickup is late',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Total amount to pay (vehiclePrice + auctionFee + storageFee)',
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Payment method (stripe, flouci, etc.)',
  },
  transactionId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Payment gateway transaction ID',
  },
  invoiceNumber: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Invoice/receipt number',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'auction_payments',
});

module.exports = AuctionPayment;

