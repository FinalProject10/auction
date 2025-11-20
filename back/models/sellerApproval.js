const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const SellerApproval = sequelize.define("sellerApproval", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'items_id',
  },
  bidId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bid_id',
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sellers_id',
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'counteroffer'),
    allowNull: false,
    defaultValue: 'pending',
  },
  sellerResponse: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Seller response message or notes',
  },
  counterofferAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Counteroffer amount if status is counteroffer',
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Deadline for seller to respond',
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When seller responded',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'seller_approvals',
});

module.exports = SellerApproval;

