const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Deposit = sequelize.define("deposit", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'clients_id',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Deposit amount in currency',
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'refunded', 'forfeited'),
    allowNull: false,
    defaultValue: 'pending',
  },
  maxBiddingPower: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Maximum bidding power (deposit × 10 multiplier)',
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Payment method used (stripe, flouci, etc.)',
  },
  transactionId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Payment gateway transaction ID',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'deposits',
});

module.exports = Deposit;

